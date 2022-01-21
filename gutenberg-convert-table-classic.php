<?php
/**
 * Plugin Name:       Gutenberg Convert Table Classic
 * Description:       Convert <code>table</code> in Classic block instead of Table Block (preserve markup)
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Marie Comet
 * Author URI:        https://mariecomet.fr/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gutenberg-convert-table-classic
 *
 * @package           create-block
 */

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! defined( 'GCTC_PATH' ) ) {
    define( 'GCTC_PATH', plugin_dir_path( __FILE__ ) );
}
if ( ! defined( 'GCTC_URL' ) ) {
    define( 'GCTC_URL', plugin_dir_url( __FILE__ ) );
}

function convert_table_classic_editor_scripts() {
    wp_register_script(
        'convert-table-classic',
        GCTC_URL . 'build/index.js',
        [ 'wp-blocks', 'wp-dom', 'wp-dom-ready', 'wp-edit-post' ],
        filemtime( GCTC_PATH . 'build/index.js' )
    );
    wp_enqueue_script( 'convert-table-classic' );
}
add_action( 'enqueue_block_editor_assets', 'convert_table_classic_editor_scripts' );