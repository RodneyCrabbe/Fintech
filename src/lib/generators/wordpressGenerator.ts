import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { GeneratorProgress } from './index'

export interface WordPressGeneratorOptions {
  themeName?: string
  includePages?: boolean
  includeDocs?: boolean
  onProgress?: (progress: GeneratorProgress) => void
}

// WordPress style.css (theme header)
const getStyleCss = (themeName: string) => `/*
Theme Name: ${themeName}
Theme URI: https://fintechpro.dev
Author: Fintech Pro UI Kit
Author URI: https://fintechpro.dev
Description: A modern fintech dashboard theme with crypto widgets, charts, and financial components. Built with Tailwind CSS.
Version: 1.0.0
License: MIT License
License URI: https://opensource.org/licenses/MIT
Text Domain: fintech-pro
Tags: fintech, crypto, dashboard, dark-mode, responsive, tailwindcss

Fintech Pro UI Kit - WordPress Theme
Production-ready fintech components converted to PHP templates.
*/

/* Tailwind CSS will be loaded from assets/css/tailwind.css */
`

// Functions.php
const functionsPhp = `<?php
/**
 * Fintech Pro Theme Functions
 *
 * @package Fintech_Pro
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// Theme Setup
function fintech_pro_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');
    
    // Let WordPress manage the document title
    add_theme_support('title-tag');
    
    // Enable support for Post Thumbnails
    add_theme_support('post-thumbnails');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'fintech-pro'),
        'footer'  => esc_html__('Footer Menu', 'fintech-pro'),
    ));
    
    // Add support for HTML5 markup
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));
    
    // Add support for custom logo
    add_theme_support('custom-logo', array(
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    
    // Add support for editor styles
    add_theme_support('editor-styles');
}
add_action('after_setup_theme', 'fintech_pro_setup');

// Enqueue Styles and Scripts
function fintech_pro_scripts() {
    // Main stylesheet
    wp_enqueue_style(
        'fintech-pro-style',
        get_stylesheet_uri(),
        array(),
        '1.0.0'
    );
    
    // Tailwind CSS
    wp_enqueue_style(
        'fintech-pro-tailwind',
        get_template_directory_uri() . '/assets/css/tailwind.css',
        array(),
        '1.0.0'
    );
    
    // Custom CSS
    wp_enqueue_style(
        'fintech-pro-custom',
        get_template_directory_uri() . '/assets/css/custom.css',
        array('fintech-pro-tailwind'),
        '1.0.0'
    );
    
    // Google Fonts
    wp_enqueue_style(
        'fintech-pro-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        array(),
        null
    );
    
    // Theme JavaScript
    wp_enqueue_script(
        'fintech-pro-scripts',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        '1.0.0',
        true
    );
    
    // Alpine.js for interactivity
    wp_enqueue_script(
        'alpine-js',
        'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js',
        array(),
        '3.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'fintech_pro_scripts');

// Register Widget Areas
function fintech_pro_widgets_init() {
    register_sidebar(array(
        'name'          => esc_html__('Sidebar', 'fintech-pro'),
        'id'            => 'sidebar-1',
        'description'   => esc_html__('Add widgets here.', 'fintech-pro'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
    
    register_sidebar(array(
        'name'          => esc_html__('Dashboard Sidebar', 'fintech-pro'),
        'id'            => 'dashboard-sidebar',
        'description'   => esc_html__('Dashboard widgets area.', 'fintech-pro'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'fintech_pro_widgets_init');

// Custom Theme Options
function fintech_pro_customize_register($wp_customize) {
    // Theme Colors Section
    $wp_customize->add_section('fintech_pro_colors', array(
        'title'    => __('Theme Colors', 'fintech-pro'),
        'priority' => 30,
    ));
    
    // Primary Color
    $wp_customize->add_setting('primary_color', array(
        'default'           => '#1E40AF',
        'sanitize_callback' => 'sanitize_hex_color',
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'primary_color', array(
        'label'   => __('Primary Color', 'fintech-pro'),
        'section' => 'fintech_pro_colors',
    )));
    
    // Dark Mode Toggle
    $wp_customize->add_setting('enable_dark_mode', array(
        'default'           => true,
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    
    $wp_customize->add_control('enable_dark_mode', array(
        'label'   => __('Enable Dark Mode by Default', 'fintech-pro'),
        'section' => 'fintech_pro_colors',
        'type'    => 'checkbox',
    ));
}
add_action('customize_register', 'fintech_pro_customize_register');

// Helper function for dark mode class
function fintech_pro_body_class($classes) {
    if (get_theme_mod('enable_dark_mode', true)) {
        $classes[] = 'dark-mode';
    }
    return $classes;
}
add_filter('body_class', 'fintech_pro_body_class');

// Include template parts functions
require get_template_directory() . '/inc/template-functions.php';
require get_template_directory() . '/inc/template-tags.php';
`

// Header.php
const headerPhp = `<?php
/**
 * Header Template
 *
 * @package Fintech_Pro
 */

$is_dark = get_theme_mod('enable_dark_mode', true);
$dark_class = $is_dark ? 'bg-slate-950' : 'bg-slate-50';
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class($dark_class); ?>>
<?php wp_body_open(); ?>

<div id="page" class="min-h-screen">
    <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Skip to content', 'fintech-pro'); ?></a>
    
    <!-- Header -->
    <header class="sticky top-0 z-40 backdrop-blur-xl border-b <?php echo $is_dark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'; ?>">
        <div class="max-w-7xl mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center gap-3">
                    <?php if (has_custom_logo()) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <div class="relative">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h1 class="text-lg font-bold tracking-tight <?php echo $is_dark ? 'text-white' : 'text-slate-900'; ?>">
                                <?php bloginfo('name'); ?>
                            </h1>
                        </div>
                    <?php endif; ?>
                </div>
                
                <!-- Navigation -->
                <nav class="hidden md:flex items-center gap-1">
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_class'     => 'flex items-center gap-1',
                        'container'      => false,
                        'fallback_cb'    => false,
                        'walker'         => new Fintech_Pro_Nav_Walker($is_dark),
                    ));
                    ?>
                </nav>
                
                <!-- Right Section -->
                <div class="flex items-center gap-4">
                    <!-- Theme Toggle -->
                    <button id="theme-toggle" class="p-2 rounded-xl transition-colors <?php echo $is_dark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'; ?>">
                        <?php if ($is_dark) : ?>
                            <svg class="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                            </svg>
                        <?php else : ?>
                            <svg class="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        <?php endif; ?>
                    </button>
                </div>
            </div>
        </div>
    </header>
`

// Footer.php
const footerPhp = `<?php
/**
 * Footer Template
 *
 * @package Fintech_Pro
 */

$is_dark = get_theme_mod('enable_dark_mode', true);
?>

    <!-- Footer -->
    <footer class="border-t <?php echo $is_dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'; ?>">
        <div class="max-w-7xl mx-auto px-6 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="font-bold mb-4 <?php echo $is_dark ? 'text-white' : 'text-slate-900'; ?>">
                        <?php bloginfo('name'); ?>
                    </h3>
                    <p class="text-sm <?php echo $is_dark ? 'text-slate-400' : 'text-slate-600'; ?>">
                        <?php bloginfo('description'); ?>
                    </p>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-4 <?php echo $is_dark ? 'text-white' : 'text-slate-900'; ?>">Quick Links</h4>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'menu_class'     => 'space-y-2',
                        'container'      => false,
                        'fallback_cb'    => false,
                    ));
                    ?>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-4 <?php echo $is_dark ? 'text-white' : 'text-slate-900'; ?>">Contact</h4>
                    <p class="text-sm <?php echo $is_dark ? 'text-slate-400' : 'text-slate-600'; ?>">
                        support@fintechpro.dev
                    </p>
                </div>
                
                <div>
                    <?php if (is_active_sidebar('footer-widget')) : ?>
                        <?php dynamic_sidebar('footer-widget'); ?>
                    <?php endif; ?>
                </div>
            </div>
            
            <div class="border-t mt-8 pt-8 <?php echo $is_dark ? 'border-slate-800' : 'border-slate-200'; ?>">
                <p class="text-sm text-center <?php echo $is_dark ? 'text-slate-500' : 'text-slate-500'; ?>">
                    &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
`

// Index.php
const indexPhp = `<?php
/**
 * Main Template
 *
 * @package Fintech_Pro
 */

get_header();

$is_dark = get_theme_mod('enable_dark_mode', true);
?>

<main id="primary" class="max-w-7xl mx-auto px-6 py-8">
    <?php if (have_posts()) : ?>
        
        <div class="grid gap-6">
            <?php while (have_posts()) : the_post(); ?>
                
                <article id="post-<?php the_ID(); ?>" <?php post_class('rounded-2xl border overflow-hidden ' . ($is_dark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200')); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="aspect-video overflow-hidden">
                            <?php the_post_thumbnail('large', array('class' => 'w-full h-full object-cover')); ?>
                        </div>
                    <?php endif; ?>
                    
                    <div class="p-6">
                        <header class="entry-header mb-4">
                            <?php the_title(sprintf('<h2 class="text-xl font-bold %s"><a href="%s">', $is_dark ? 'text-white' : 'text-slate-900', esc_url(get_permalink())), '</a></h2>'); ?>
                            
                            <div class="flex items-center gap-4 mt-2 text-sm <?php echo $is_dark ? 'text-slate-400' : 'text-slate-600'; ?>">
                                <time datetime="<?php echo get_the_date('c'); ?>"><?php echo get_the_date(); ?></time>
                                <span><?php the_author(); ?></span>
                            </div>
                        </header>
                        
                        <div class="entry-content <?php echo $is_dark ? 'text-slate-300' : 'text-slate-700'; ?>">
                            <?php the_excerpt(); ?>
                        </div>
                        
                        <a href="<?php the_permalink(); ?>" class="inline-flex items-center gap-2 mt-4 text-sm font-medium text-emerald-400 hover:text-emerald-300">
                            Read More
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </article>
                
            <?php endwhile; ?>
        </div>
        
        <?php the_posts_pagination(array(
            'prev_text' => '&larr; Previous',
            'next_text' => 'Next &rarr;',
        )); ?>
        
    <?php else : ?>
        
        <div class="text-center py-12">
            <h2 class="text-xl font-bold mb-4 <?php echo $is_dark ? 'text-white' : 'text-slate-900'; ?>">
                <?php esc_html_e('No posts found', 'fintech-pro'); ?>
            </h2>
            <p class="<?php echo $is_dark ? 'text-slate-400' : 'text-slate-600'; ?>">
                <?php esc_html_e('It seems we can\'t find what you\'re looking for.', 'fintech-pro'); ?>
            </p>
        </div>
        
    <?php endif; ?>
</main>

<?php
get_footer();
`

// Template part: Balance Widget
const balanceWidgetPhp = `<?php
/**
 * Balance Widget Component
 *
 * @package Fintech_Pro
 * 
 * @param float  $balance      The balance amount
 * @param string $currency     Currency code (default: 'USD')
 * @param string $label        Widget label
 * @param string $trend        Trend direction: 'up', 'down', 'neutral'
 * @param float  $trend_value  Trend amount
 * @param string $trend_period Period text (default: 'vs last month')
 * @param string $variant      Variant: 'default', 'outline', 'ghost'
 * @param string $size         Size: 'sm', 'md', 'lg'
 */

$balance = $args['balance'] ?? 0;
$currency = $args['currency'] ?? 'USD';
$label = $args['label'] ?? 'Current Balance';
$trend = $args['trend'] ?? null;
$trend_value = $args['trend_value'] ?? null;
$trend_period = $args['trend_period'] ?? 'vs last month';
$variant = $args['variant'] ?? 'default';
$size = $args['size'] ?? 'md';
$is_dark = $args['is_dark'] ?? true;

// Format currency
$formatted_balance = number_format($balance, 2);
$currency_symbol = '$';

// Size classes
$size_classes = array(
    'sm' => 'p-4 gap-2',
    'md' => 'p-6 gap-3',
    'lg' => 'p-8 gap-4',
);

$text_sizes = array(
    'sm' => array('label' => 'text-xs', 'balance' => 'text-lg', 'trend' => 'text-xs'),
    'md' => array('label' => 'text-sm', 'balance' => 'text-2xl', 'trend' => 'text-sm'),
    'lg' => array('label' => 'text-base', 'balance' => 'text-3xl', 'trend' => 'text-base'),
);

// Variant classes
$variant_classes = array(
    'default' => $is_dark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm',
    'outline' => 'bg-transparent border-slate-300 hover:border-blue-600',
    'ghost' => $is_dark ? 'bg-slate-800/50 border-transparent' : 'bg-slate-50 border-transparent',
);

// Trend colors
$trend_colors = array(
    'up' => 'text-green-500',
    'down' => 'text-red-500',
    'neutral' => $is_dark ? 'text-slate-500' : 'text-slate-600',
);

$current_size = $text_sizes[$size];
?>

<div class="relative flex flex-col rounded-xl border transition-all duration-200 <?php echo esc_attr($variant_classes[$variant] . ' ' . $size_classes[$size]); ?>">
    <label class="<?php echo esc_attr($current_size['label']); ?> font-medium <?php echo $is_dark ? 'text-slate-400' : 'text-slate-600'; ?>">
        <?php echo esc_html($label); ?>
    </label>
    
    <div class="flex items-baseline gap-2">
        <span class="<?php echo esc_attr($current_size['balance']); ?> font-bold <?php echo $is_dark ? 'text-white' : 'text-slate-900'; ?>">
            <?php echo esc_html($currency_symbol . $formatted_balance); ?>
        </span>
        <span class="text-base font-semibold <?php echo $is_dark ? 'text-slate-500' : 'text-slate-700'; ?>">
            <?php echo esc_html($currency); ?>
        </span>
    </div>
    
    <?php if ($trend && $trend_value !== null) : ?>
        <div class="flex items-center gap-1 <?php echo esc_attr($current_size['trend'] . ' ' . $trend_colors[$trend]); ?>">
            <?php if ($trend === 'up') : ?>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                </svg>
            <?php elseif ($trend === 'down') : ?>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd" />
                </svg>
            <?php else : ?>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
            <?php endif; ?>
            <span>
                <?php echo $trend === 'up' ? '+' : ($trend === 'down' ? '-' : ''); ?>
                <?php echo esc_html($currency_symbol . number_format($trend_value, 2) . ' ' . $trend_period); ?>
            </span>
        </div>
    <?php endif; ?>
</div>
`

// Template for dashboard page
const dashboardTemplatePhp = `<?php
/**
 * Template Name: Crypto Dashboard
 * 
 * Dashboard page template
 *
 * @package Fintech_Pro
 */

get_header();

$is_dark = get_theme_mod('enable_dark_mode', true);
?>

<main id="primary" class="max-w-7xl mx-auto px-6 py-8">
    <!-- Welcome Banner -->
    <section class="mb-8">
        <div class="rounded-2xl p-6 mb-6 border relative overflow-hidden <?php echo $is_dark ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-800' : 'bg-gradient-to-r from-white via-slate-50 to-white border-slate-200'; ?>">
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
            <div class="relative">
                <p class="text-sm font-medium mb-1 <?php echo $is_dark ? 'text-slate-400' : 'text-slate-600'; ?>">
                    Good morning, <?php echo esc_html(wp_get_current_user()->display_name ?: 'User'); ?> 👋
                </p>
                <h2 class="text-2xl md:text-3xl font-bold tracking-tight <?php echo $is_dark ? 'text-white' : 'text-slate-900'; ?>">
                    Your portfolio is up <span class="text-emerald-400">+4.52%</span> today
                </h2>
            </div>
        </div>
    </section>

    <!-- Balance Widgets -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <?php
        get_template_part('template-parts/balance-widget', null, array(
            'balance' => 100000,
            'currency' => 'USD',
            'label' => 'Total Portfolio',
            'trend' => 'up',
            'trend_value' => 4520,
            'trend_period' => 'today',
            'is_dark' => $is_dark,
        ));
        
        get_template_part('template-parts/balance-widget', null, array(
            'balance' => 45230,
            'currency' => 'USD',
            'label' => 'Available Balance',
            'trend' => 'neutral',
            'is_dark' => $is_dark,
        ));
        
        get_template_part('template-parts/balance-widget', null, array(
            'balance' => 54770,
            'currency' => 'USD',
            'label' => 'In Positions',
            'trend' => 'up',
            'trend_value' => 2340,
            'trend_period' => '24h',
            'is_dark' => $is_dark,
        ));
        ?>
    </section>

    <!-- Crypto Price Tickers -->
    <section class="flex gap-4 overflow-x-auto pb-4 mb-8" x-data="cryptoTickers()">
        <template x-for="ticker in tickers" :key="ticker.symbol">
            <div class="flex-shrink-0 min-w-[280px] rounded-lg border p-4 <?php echo $is_dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'; ?>">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                            <span class="text-xs font-bold text-white" x-text="ticker.symbol.charAt(0)"></span>
                        </div>
                        <div>
                            <p class="font-semibold <?php echo $is_dark ? 'text-white' : 'text-slate-900'; ?>" x-text="ticker.symbol"></p>
                            <p class="text-xs <?php echo $is_dark ? 'text-slate-500' : 'text-slate-500'; ?>" x-text="ticker.name"></p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold <?php echo $is_dark ? 'text-white' : 'text-slate-900'; ?>" x-text="'$' + ticker.price.toLocaleString()"></p>
                        <p :class="ticker.change >= 0 ? 'text-emerald-400' : 'text-red-400'" class="text-xs" x-text="(ticker.change >= 0 ? '+' : '') + ticker.change + '%'"></p>
                    </div>
                </div>
            </div>
        </template>
    </section>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8">
            <!-- Chart Placeholder -->
            <div class="rounded-2xl border p-6 <?php echo $is_dark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'; ?>">
                <h3 class="font-semibold mb-4 <?php echo $is_dark ? 'text-white' : 'text-slate-900'; ?>">Portfolio Performance</h3>
                <div class="h-64 flex items-center justify-center <?php echo $is_dark ? 'bg-slate-800/50' : 'bg-slate-100'; ?> rounded-xl">
                    <p class="<?php echo $is_dark ? 'text-slate-500' : 'text-slate-500'; ?>">Chart component - integrate with Chart.js or similar</p>
                </div>
            </div>
        </div>
        
        <div class="lg:col-span-4">
            <!-- Quick Trade Widget -->
            <div class="rounded-2xl border overflow-hidden <?php echo $is_dark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'; ?>">
                <div class="p-5 border-b <?php echo $is_dark ? 'border-slate-800' : 'border-slate-100'; ?>">
                    <h3 class="font-semibold <?php echo $is_dark ? 'text-white' : 'text-slate-900'; ?>">Quick Trade</h3>
                </div>
                <div class="p-5">
                    <div class="flex p-1 rounded-xl mb-4 <?php echo $is_dark ? 'bg-slate-800' : 'bg-slate-100'; ?>">
                        <button class="flex-1 py-2 text-sm font-semibold rounded-lg bg-emerald-500 text-white">Buy</button>
                        <button class="flex-1 py-2 text-sm font-semibold rounded-lg <?php echo $is_dark ? 'text-slate-400' : 'text-slate-600'; ?>">Sell</button>
                    </div>
                    <p class="text-center py-8 <?php echo $is_dark ? 'text-slate-500' : 'text-slate-500'; ?>">Trade form - customize as needed</p>
                </div>
            </div>
        </div>
    </div>
</main>

<script>
function cryptoTickers() {
    return {
        tickers: [
            { symbol: 'BTC', name: 'Bitcoin', price: 67542.30, change: 2.45 },
            { symbol: 'ETH', name: 'Ethereum', price: 3245.67, change: -1.23 },
            { symbol: 'SOL', name: 'Solana', price: 178.92, change: 5.67 },
            { symbol: 'XRP', name: 'Ripple', price: 0.62, change: 0.89 },
        ]
    }
}
</script>

<?php
get_footer();
`

// Main CSS
const mainCss = `/* Tailwind CSS - Import from CDN or compile locally */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
    --color-primary: #1E40AF;
    --color-secondary: #64748B;
    --color-accent: #10B981;
}

.dark-mode {
    --color-bg: #0a0a0a;
    --color-surface: #141414;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #1e293b;
}

::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #64748b;
}

/* Animation utilities */
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`

// JavaScript
const mainJs = `/**
 * Fintech Pro Theme JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            // Save preference
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('fintech-pro-dark-mode', isDark ? 'true' : 'false');
        });
    }
    
    // Check saved preference
    const savedTheme = localStorage.getItem('fintech-pro-dark-mode');
    if (savedTheme === 'false') {
        document.body.classList.remove('dark-mode');
    }
    
    // Format currency helper
    window.formatCurrency = function(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };
});
`

// README
const wpReadmeContent = `# Fintech Pro - WordPress Theme

A modern fintech dashboard theme with crypto widgets, charts, and financial components.

## Installation

1. Download and extract the theme zip file
2. Upload the theme folder to \`/wp-content/themes/\`
3. Activate the theme through the WordPress admin panel

## Features

- Dark/Light mode toggle
- Responsive design
- Crypto price tickers
- Portfolio dashboard
- Balance widgets
- Trading components
- Tailwind CSS styling
- Alpine.js interactivity

## Template Parts

The theme includes these component templates in \`template-parts/\`:

- \`balance-widget.php\` - Display account balances
- More components available

## Page Templates

- \`page-dashboard.php\` - Crypto dashboard template

## Customization

Use the WordPress Customizer to:
- Set primary color
- Toggle dark mode default
- Upload custom logo

## Requirements

- WordPress 5.9+
- PHP 7.4+

## License

MIT License
`

export async function generateWordPressTheme(
  options: WordPressGeneratorOptions = {}
): Promise<void> {
  const { 
    themeName = 'Fintech Pro', 
    includePages = true, 
    includeDocs = true, 
    onProgress 
  } = options

  try {
    onProgress?.({
      status: 'preparing',
      progress: 0,
      message: 'Preparing WordPress theme...'
    })

    const zip = new JSZip()
    const rootFolder = zip.folder('fintech-pro-wordpress')!

    // Add core theme files
    onProgress?.({
      status: 'generating',
      progress: 15,
      message: 'Adding theme files...'
    })

    rootFolder.file('style.css', getStyleCss(themeName))
    rootFolder.file('functions.php', functionsPhp)
    rootFolder.file('header.php', headerPhp)
    rootFolder.file('footer.php', footerPhp)
    rootFolder.file('index.php', indexPhp)
    rootFolder.file('404.php', `<?php get_header(); ?>
<main class="max-w-7xl mx-auto px-6 py-16 text-center">
    <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p class="text-slate-500">The page you're looking for doesn't exist.</p>
    <a href="<?php echo home_url(); ?>" class="inline-block mt-8 px-6 py-3 bg-emerald-500 text-white rounded-lg">Go Home</a>
</main>
<?php get_footer(); ?>`)
    rootFolder.file('page.php', indexPhp)
    rootFolder.file('single.php', indexPhp)
    rootFolder.file('sidebar.php', `<?php if (is_active_sidebar('sidebar-1')) : dynamic_sidebar('sidebar-1'); endif; ?>`)

    // Add template parts
    onProgress?.({
      status: 'generating',
      progress: 35,
      message: 'Adding template parts...'
    })

    const templatePartsFolder = rootFolder.folder('template-parts')!
    templatePartsFolder.file('balance-widget.php', balanceWidgetPhp)

    // Add page templates
    if (includePages) {
      onProgress?.({
        status: 'generating',
        progress: 50,
        message: 'Adding page templates...'
      })

      const pageTemplatesFolder = rootFolder.folder('page-templates')!
      pageTemplatesFolder.file('template-dashboard.php', dashboardTemplatePhp)
    }

    // Add inc folder
    const incFolder = rootFolder.folder('inc')!
    incFolder.file('template-functions.php', `<?php
/**
 * Template Functions
 */

function fintech_pro_body_classes($classes) {
    if (!is_singular()) {
        $classes[] = 'hfeed';
    }
    return $classes;
}
add_filter('body_class', 'fintech_pro_body_classes');
`)
    incFolder.file('template-tags.php', `<?php
/**
 * Template Tags
 */

function fintech_pro_posted_on() {
    echo '<time datetime="' . esc_attr(get_the_date('c')) . '">' . esc_html(get_the_date()) . '</time>';
}
`)

    // Add assets
    onProgress?.({
      status: 'generating',
      progress: 65,
      message: 'Adding assets...'
    })

    const assetsFolder = rootFolder.folder('assets')!
    const cssFolder = assetsFolder.folder('css')!
    cssFolder.file('tailwind.css', mainCss)
    cssFolder.file('custom.css', '/* Custom styles go here */')

    const jsFolder = assetsFolder.folder('js')!
    jsFolder.file('main.js', mainJs)

    const imagesFolder = assetsFolder.folder('images')!
    imagesFolder.file('.gitkeep', '')

    // Add documentation
    if (includeDocs) {
      onProgress?.({
        status: 'generating',
        progress: 80,
        message: 'Adding documentation...'
      })

      rootFolder.file('README.md', wpReadmeContent)
      rootFolder.file('screenshot.png', '') // Placeholder
    }

    // Generate ZIP
    onProgress?.({
      status: 'generating',
      progress: 90,
      message: 'Compressing files...'
    })

    const blob = await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 }
    })

    // Download
    onProgress?.({
      status: 'downloading',
      progress: 95,
      message: 'Starting download...'
    })

    saveAs(blob, 'fintech-pro-wordpress-v1.0.0.zip')

    onProgress?.({
      status: 'complete',
      progress: 100,
      message: 'Download complete!'
    })

  } catch (error) {
    console.error('Error generating WordPress theme:', error)
    onProgress?.({
      status: 'error',
      progress: 0,
      message: error instanceof Error ? error.message : 'Failed to generate theme'
    })
    throw error
  }
}

