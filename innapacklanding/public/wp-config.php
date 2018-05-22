<?php
define('DB_NAME', 'innapacklanding-wp-JNj1G7ZB');
define('DB_USER', 'YXBTd6DZ12ZR');
define('DB_PASSWORD', '8uSQaT0Sm9Gvr5Il');

define('DB_HOST', 'localhost');
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

define('AUTH_KEY',         'Pp5eXcwoLrlOZjGQxYf4ux23Hr60xyGCfDHDN7g8');
define('SECURE_AUTH_KEY',  'OTR2U3yLQVHyAdocwaQtFcXVSpDchh6bh2d7d8GZ');
define('LOGGED_IN_KEY',    'zantxiPUxcmrVw53LM7t5M3i0Q0NSTwCeWSOxoxZ');
define('NONCE_KEY',        '5KuQDaLwaNnTamVQysKmpmHX2rOBzHiajzqaBvhE');
define('AUTH_SALT',        'BHvu5CSU48qSGPUh7jsVi4dlxOWpsdrEs4c6REGw');
define('SECURE_AUTH_SALT', '1lvBvGoM9hbIL1Ppa9QJxdiIrgjVN4hE4pYl1PvT');
define('LOGGED_IN_SALT',   '6h1RvXXU7AkHcQumpIpATzE4CNRuJZ3g5p2qu69V');
define('NONCE_SALT',       'qb6G1tunXSfscIoSpTR0o5Zus4XAsvCSPDeMOix0');

$table_prefix  = 'wp_33af4d66e2_';

define('SP_REQUEST_URL', ($_SERVER['HTTPS'] ? 'https://' : 'http://') . $_SERVER['HTTP_HOST']);

define('WP_SITEURL', SP_REQUEST_URL);
define('WP_HOME', SP_REQUEST_URL);

/* Change WP_MEMORY_LIMIT to increase the memory limit for public pages. */
define('WP_MEMORY_LIMIT', '256M');

/* Uncomment and change WP_MAX_MEMORY_LIMIT to increase the memory limit for admin pages. */
//define('WP_MAX_MEMORY_LIMIT', '256M');

/* That's all, stop editing! Happy blogging. */

if ( !defined('ABSPATH') )
        define('ABSPATH', dirname(__FILE__) . '/');

require_once(ABSPATH . 'wp-settings.php');
