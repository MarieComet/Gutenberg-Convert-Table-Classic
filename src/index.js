import { createBlock } from '@wordpress/blocks';

const tableContentPasteSchema = ( { phrasingContentSchema } ) => ( {
	tr: {
		allowEmpty: true,
		children: {
			th: {
				allowEmpty: true,
				children: phrasingContentSchema,
				attributes: [ 'scope' ],
			},
			td: {
				allowEmpty: true,
				children: phrasingContentSchema,
			},
		},
	},
} );

const tablePasteSchema = ( args ) => ( {
	table: {
		children: {
			thead: {
				allowEmpty: true,
				children: tableContentPasteSchema( args ),
			},
			tfoot: {
				allowEmpty: true,
				children: tableContentPasteSchema( args ),
			},
			tbody: {
				allowEmpty: true,
				children: tableContentPasteSchema( args ),
			},
		},
	},
} );

const setTransform = ( settings, name ) => {
    // Do nothing if it's another block than our defined ones.
    if ( 'core/table' != name ) {
        return settings;
    }

    return Object.assign( {}, settings, {
        transforms: Object.assign( {}, settings.transforms, {
            from: [
                {
                    type: 'raw',
                    selector: 'table',
                    schema: tablePasteSchema,
                    transform: ( node ) => {
                        return createBlock( 'core/freeform', {
                            content: node.outerHTML,
                        } );
                    },
                },
            ]
        } ),
    } );
};
wp.hooks.addFilter(
    'blocks.registerBlockType',
    'bsa-gutenberg/set-transform',
    setTransform
);