import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import type { GeneratorProgress } from './index'

export interface ShopifyGeneratorOptions {
  themeName?: string
  includePages?: boolean
  includeDocs?: boolean
  onProgress?: (progress: GeneratorProgress) => void
}

// Settings schema
const settingsSchemaJson = `[
  {
    "name": "theme_info",
    "theme_name": "Fintech Pro",
    "theme_version": "1.0.0",
    "theme_author": "Fintech Pro UI Kit",
    "theme_documentation_url": "https://fintechpro.dev/docs",
    "theme_support_url": "https://fintechpro.dev/support"
  },
  {
    "name": "Colors",
    "settings": [
      {
        "type": "color",
        "id": "color_primary",
        "label": "Primary color",
        "default": "#1E40AF"
      },
      {
        "type": "color",
        "id": "color_accent",
        "label": "Accent color",
        "default": "#10B981"
      },
      {
        "type": "color",
        "id": "color_background",
        "label": "Background color",
        "default": "#0f172a"
      },
      {
        "type": "color",
        "id": "color_text",
        "label": "Text color",
        "default": "#f8fafc"
      }
    ]
  },
  {
    "name": "Typography",
    "settings": [
      {
        "type": "font_picker",
        "id": "font_heading",
        "label": "Heading font",
        "default": "inter_n4"
      },
      {
        "type": "font_picker",
        "id": "font_body",
        "label": "Body font",
        "default": "inter_n4"
      }
    ]
  },
  {
    "name": "Dark Mode",
    "settings": [
      {
        "type": "checkbox",
        "id": "enable_dark_mode",
        "label": "Enable dark mode by default",
        "default": true
      }
    ]
  }
]
`

// Theme Liquid (main layout)
const themeLiquid = `<!DOCTYPE html>
<html lang="{{ request.locale.iso_code }}">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <title>
    {{ page_title }}
    {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
    {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
    {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
  </title>

  {% if page_description %}
    <meta name="description" content="{{ page_description | escape }}">
  {% endif %}

  <link rel="canonical" href="{{ canonical_url }}">

  {%- if settings.favicon != blank -%}
    <link rel="icon" type="image/png" href="{{ settings.favicon | image_url: width: 32, height: 32 }}">
  {%- endif -%}

  {% render 'meta-tags' %}

  <script src="{{ 'constants.js' | asset_url }}" defer="defer"></script>
  <script src="{{ 'pubsub.js' | asset_url }}" defer="defer"></script>
  <script src="{{ 'global.js' | asset_url }}" defer="defer"></script>

  {{ content_for_header }}

  {%- liquid
    assign body_font_bold = settings.font_body | font_modify: 'weight', 'bold'
    assign body_font_italic = settings.font_body | font_modify: 'style', 'italic'
    assign body_font_bold_italic = body_font_bold | font_modify: 'style', 'italic'
  %}

  {% style %}
    {{ settings.font_heading | font_face: font_display: 'swap' }}
    {{ settings.font_body | font_face: font_display: 'swap' }}
    {{ body_font_bold | font_face: font_display: 'swap' }}
    {{ body_font_italic | font_face: font_display: 'swap' }}
    {{ body_font_bold_italic | font_face: font_display: 'swap' }}

    :root {
      --color-primary: {{ settings.color_primary }};
      --color-accent: {{ settings.color_accent }};
      --color-background: {{ settings.color_background }};
      --color-text: {{ settings.color_text }};
      
      --font-heading: {{ settings.font_heading.family }}, {{ settings.font_heading.fallback_families }};
      --font-body: {{ settings.font_body.family }}, {{ settings.font_body.fallback_families }};
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html {
      font-size: 62.5%;
    }

    body {
      font-family: var(--font-body);
      font-size: 1.6rem;
      line-height: 1.5;
      color: var(--color-text);
      background-color: var(--color-background);
      margin: 0;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading);
    }
  {% endstyle %}

  {{ 'tailwind.css' | asset_url | stylesheet_tag }}
  {{ 'fintech.css' | asset_url | stylesheet_tag }}

  <script>
    document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
  </script>
</head>

<body class="{% if settings.enable_dark_mode %}dark{% endif %}">
  <a class="skip-to-content-link visually-hidden" href="#MainContent">
    {{ 'accessibility.skip_to_text' | t }}
  </a>

  {% sections 'header-group' %}

  <main id="MainContent" class="content-for-layout focus-none" role="main" tabindex="-1">
    {{ content_for_layout }}
  </main>

  {% sections 'footer-group' %}

  <script src="{{ 'fintech.js' | asset_url }}" defer="defer"></script>
</body>
</html>
`

// Header section
const headerSectionLiquid = `{% comment %}
  Header Section
{% endcomment %}

{%- style -%}
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{%- endstyle -%}

<header class="sticky top-0 z-40 backdrop-blur-xl border-b bg-slate-950/80 border-slate-800">
  <div class="max-w-7xl mx-auto px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-3">
        {% if section.settings.logo != blank %}
          <img 
            src="{{ section.settings.logo | image_url: width: 200 }}"
            alt="{{ shop.name }}"
            class="h-10 w-auto"
            loading="lazy"
          >
        {% else %}
          <div class="relative">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950"></span>
          </div>
          <div>
            <h1 class="text-lg font-bold tracking-tight text-white">
              {{ shop.name }}
            </h1>
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-xs text-slate-500">Live</span>
            </div>
          </div>
        {% endif %}
      </div>
      
      <!-- Navigation -->
      <nav class="hidden md:flex items-center gap-1">
        {% for link in section.settings.menu.links %}
          <a 
            href="{{ link.url }}"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-slate-400 hover:text-white hover:bg-slate-800/50"
          >
            {{ link.title }}
          </a>
        {% endfor %}
      </nav>
      
      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <!-- Cart -->
        <a href="{{ routes.cart_url }}" class="relative p-2 rounded-xl transition-colors hover:bg-slate-800">
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {% if cart.item_count > 0 %}
            <span class="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {{ cart.item_count }}
            </span>
          {% endif %}
        </a>
        
        <!-- Account -->
        {% if customer %}
          <a href="{{ routes.account_url }}" class="p-2 rounded-xl transition-colors hover:bg-slate-800">
            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </a>
        {% else %}
          <a href="{{ routes.account_login_url }}" class="p-2 rounded-xl transition-colors hover:bg-slate-800">
            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </a>
        {% endif %}
      </div>
    </div>
  </div>
</header>

{% schema %}
{
  "name": "Header",
  "class": "section-header",
  "settings": [
    {
      "type": "image_picker",
      "id": "logo",
      "label": "Logo"
    },
    {
      "type": "link_list",
      "id": "menu",
      "default": "main-menu",
      "label": "Menu"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Top padding",
      "default": 16
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Bottom padding",
      "default": 16
    }
  ]
}
{% endschema %}
`

// Balance Widget Section
const balanceWidgetSectionLiquid = `{% comment %}
  Balance Widget Section
{% endcomment %}

{%- style -%}
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{%- endstyle -%}

<div class="section-{{ section.id }}-padding">
  <div class="max-w-7xl mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-{{ section.settings.columns }} gap-4">
      {% for block in section.blocks %}
        {% case block.type %}
          {% when 'balance' %}
            <div 
              class="relative flex flex-col rounded-xl border transition-all duration-200 p-6 gap-3
                {% if settings.enable_dark_mode %}
                  bg-slate-900/80 border-slate-800
                {% else %}
                  bg-white border-slate-200 shadow-sm
                {% endif %}"
              {{ block.shopify_attributes }}
            >
              <label class="text-sm font-medium {% if settings.enable_dark_mode %}text-slate-400{% else %}text-slate-600{% endif %}">
                {{ block.settings.label }}
              </label>
              
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-bold {% if settings.enable_dark_mode %}text-white{% else %}text-slate-900{% endif %}">
                  {{ block.settings.balance | money }}
                </span>
                <span class="text-base font-semibold {% if settings.enable_dark_mode %}text-slate-500{% else %}text-slate-700{% endif %}">
                  {{ shop.currency }}
                </span>
              </div>
              
              {% if block.settings.show_trend %}
                <div class="flex items-center gap-1 text-sm
                  {% if block.settings.trend == 'up' %}
                    text-green-500
                  {% elsif block.settings.trend == 'down' %}
                    text-red-500
                  {% else %}
                    {% if settings.enable_dark_mode %}text-slate-500{% else %}text-slate-600{% endif %}
                  {% endif %}">
                  {% if block.settings.trend == 'up' %}
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                    </svg>
                  {% elsif block.settings.trend == 'down' %}
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd" />
                    </svg>
                  {% else %}
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                    </svg>
                  {% endif %}
                  <span>
                    {% if block.settings.trend == 'up' %}+{% elsif block.settings.trend == 'down' %}-{% endif %}
                    {{ block.settings.trend_value | money }} {{ block.settings.trend_period }}
                  </span>
                </div>
              {% endif %}
            </div>
        {% endcase %}
      {% endfor %}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Balance Widgets",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "range",
      "id": "columns",
      "min": 1,
      "max": 4,
      "step": 1,
      "default": 3,
      "label": "Number of columns"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Top padding",
      "default": 36
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Bottom padding",
      "default": 36
    }
  ],
  "blocks": [
    {
      "type": "balance",
      "name": "Balance Card",
      "settings": [
        {
          "type": "text",
          "id": "label",
          "label": "Label",
          "default": "Total Balance"
        },
        {
          "type": "text",
          "id": "balance",
          "label": "Balance amount",
          "default": "10000000"
        },
        {
          "type": "checkbox",
          "id": "show_trend",
          "label": "Show trend",
          "default": true
        },
        {
          "type": "select",
          "id": "trend",
          "label": "Trend direction",
          "options": [
            { "value": "up", "label": "Up" },
            { "value": "down", "label": "Down" },
            { "value": "neutral", "label": "Neutral" }
          ],
          "default": "up"
        },
        {
          "type": "text",
          "id": "trend_value",
          "label": "Trend value",
          "default": "452000"
        },
        {
          "type": "text",
          "id": "trend_period",
          "label": "Trend period",
          "default": "today"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Balance Widgets",
      "blocks": [
        {
          "type": "balance",
          "settings": {
            "label": "Total Portfolio",
            "balance": "10000000",
            "trend": "up",
            "trend_value": "452000",
            "trend_period": "today"
          }
        },
        {
          "type": "balance",
          "settings": {
            "label": "Available Balance",
            "balance": "4523000",
            "trend": "neutral"
          }
        },
        {
          "type": "balance",
          "settings": {
            "label": "In Positions",
            "balance": "5477000",
            "trend": "up",
            "trend_value": "234000",
            "trend_period": "24h"
          }
        }
      ]
    }
  ]
}
{% endschema %}
`

// Price Ticker Section
const priceTickerSectionLiquid = `{% comment %}
  Crypto Price Ticker Section
{% endcomment %}

{%- style -%}
  .section-{{ section.id }}-padding {
    padding-top: {{ section.settings.padding_top | times: 0.75 | round: 0 }}px;
    padding-bottom: {{ section.settings.padding_bottom | times: 0.75 | round: 0 }}px;
  }

  @media screen and (min-width: 750px) {
    .section-{{ section.id }}-padding {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{%- endstyle -%}

<div class="section-{{ section.id }}-padding">
  <div class="max-w-7xl mx-auto px-6">
    <div class="flex items-center gap-4 overflow-x-auto pb-2" id="crypto-tickers-{{ section.id }}">
      {% for block in section.blocks %}
        {% case block.type %}
          {% when 'ticker' %}
            <div 
              class="flex-shrink-0 min-w-[280px] inline-flex items-center justify-between rounded-lg font-medium transition-all duration-200 border backdrop-blur-sm px-4 py-3 gap-3
                {% if settings.enable_dark_mode %}
                  bg-gradient-to-r from-slate-800 to-slate-700 border-slate-600 text-white
                {% else %}
                  bg-gradient-to-r from-slate-50 to-slate-100 text-slate-900 border-slate-200
                {% endif %}"
              {{ block.shopify_attributes }}
              data-symbol="{{ block.settings.symbol }}"
              data-price="{{ block.settings.price }}"
              data-change="{{ block.settings.change }}"
            >
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full {% if settings.enable_dark_mode %}bg-slate-600{% else %}bg-slate-200{% endif %} flex items-center justify-center">
                  <span class="text-xs font-bold">{{ block.settings.symbol | slice: 0, 1 }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold">{{ block.settings.symbol }}</span>
                  <span class="text-xs {% if settings.enable_dark_mode %}text-slate-400{% else %}text-slate-500{% endif %}">
                    {{ block.settings.name }}
                  </span>
                </div>
              </div>
              <div class="text-right">
                <div class="font-bold ticker-price">
                  {{ block.settings.price | prepend: '$' }}
                </div>
                <div class="text-xs ticker-change {% if block.settings.change contains '-' %}text-red-400{% else %}text-green-400{% endif %}">
                  {% unless block.settings.change contains '-' %}+{% endunless %}{{ block.settings.change }}%
                </div>
              </div>
            </div>
        {% endcase %}
      {% endfor %}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Price Tickers",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Top padding",
      "default": 20
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Bottom padding",
      "default": 20
    }
  ],
  "blocks": [
    {
      "type": "ticker",
      "name": "Price Ticker",
      "settings": [
        {
          "type": "text",
          "id": "symbol",
          "label": "Symbol",
          "default": "BTC"
        },
        {
          "type": "text",
          "id": "name",
          "label": "Name",
          "default": "Bitcoin"
        },
        {
          "type": "text",
          "id": "price",
          "label": "Price",
          "default": "67,542.30"
        },
        {
          "type": "text",
          "id": "change",
          "label": "24h Change %",
          "default": "2.45"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Price Tickers",
      "blocks": [
        { "type": "ticker", "settings": { "symbol": "BTC", "name": "Bitcoin", "price": "67,542.30", "change": "2.45" } },
        { "type": "ticker", "settings": { "symbol": "ETH", "name": "Ethereum", "price": "3,245.67", "change": "-1.23" } },
        { "type": "ticker", "settings": { "symbol": "SOL", "name": "Solana", "price": "178.92", "change": "5.67" } },
        { "type": "ticker", "settings": { "symbol": "XRP", "name": "Ripple", "price": "0.62", "change": "0.89" } }
      ]
    }
  ]
}
{% endschema %}
`

// Footer Section
const footerSectionLiquid = `{% comment %}
  Footer Section
{% endcomment %}

<footer class="border-t {% if settings.enable_dark_mode %}bg-slate-900 border-slate-800{% else %}bg-white border-slate-200{% endif %}">
  <div class="max-w-7xl mx-auto px-6 py-12">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 class="font-bold mb-4 {% if settings.enable_dark_mode %}text-white{% else %}text-slate-900{% endif %}">
          {{ shop.name }}
        </h3>
        <p class="text-sm {% if settings.enable_dark_mode %}text-slate-400{% else %}text-slate-600{% endif %}">
          {{ section.settings.description | default: shop.description }}
        </p>
      </div>
      
      {% for block in section.blocks %}
        {% case block.type %}
          {% when 'menu' %}
            <div {{ block.shopify_attributes }}>
              <h4 class="font-semibold mb-4 {% if settings.enable_dark_mode %}text-white{% else %}text-slate-900{% endif %}">
                {{ block.settings.heading }}
              </h4>
              <ul class="space-y-2">
                {% for link in block.settings.menu.links %}
                  <li>
                    <a 
                      href="{{ link.url }}"
                      class="text-sm transition-colors {% if settings.enable_dark_mode %}text-slate-400 hover:text-white{% else %}text-slate-600 hover:text-slate-900{% endif %}"
                    >
                      {{ link.title }}
                    </a>
                  </li>
                {% endfor %}
              </ul>
            </div>
        {% endcase %}
      {% endfor %}
    </div>
    
    <div class="border-t mt-8 pt-8 {% if settings.enable_dark_mode %}border-slate-800{% else %}border-slate-200{% endif %}">
      <p class="text-sm text-center {% if settings.enable_dark_mode %}text-slate-500{% else %}text-slate-500{% endif %}">
        &copy; {{ 'now' | date: '%Y' }} {{ shop.name }}. {{ section.settings.copyright_text | default: 'All rights reserved.' }}
      </p>
    </div>
  </div>
</footer>

{% schema %}
{
  "name": "Footer",
  "settings": [
    {
      "type": "textarea",
      "id": "description",
      "label": "Description"
    },
    {
      "type": "text",
      "id": "copyright_text",
      "label": "Copyright text",
      "default": "All rights reserved."
    }
  ],
  "blocks": [
    {
      "type": "menu",
      "name": "Menu Column",
      "settings": [
        {
          "type": "text",
          "id": "heading",
          "label": "Heading",
          "default": "Quick Links"
        },
        {
          "type": "link_list",
          "id": "menu",
          "label": "Menu"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Footer",
      "blocks": [
        { "type": "menu", "settings": { "heading": "Quick Links" } },
        { "type": "menu", "settings": { "heading": "Support" } }
      ]
    }
  ]
}
{% endschema %}
`

// Index template
const indexTemplateLiquid = `{{ content_for_layout }}
`

// Page template JSON
const pageTemplateJson = `{
  "sections": {
    "main": {
      "type": "main-page",
      "settings": {}
    }
  },
  "order": ["main"]
}
`

// Dashboard page template
const dashboardTemplateJson = `{
  "sections": {
    "hero": {
      "type": "hero-banner",
      "settings": {
        "heading": "Welcome to your dashboard",
        "subheading": "Your portfolio is up +4.52% today"
      }
    },
    "balance-widgets": {
      "type": "balance-widget",
      "blocks": {
        "block1": {
          "type": "balance",
          "settings": {
            "label": "Total Portfolio",
            "balance": "10000000",
            "trend": "up",
            "trend_value": "452000",
            "trend_period": "today"
          }
        },
        "block2": {
          "type": "balance",
          "settings": {
            "label": "Available Balance",
            "balance": "4523000",
            "trend": "neutral"
          }
        },
        "block3": {
          "type": "balance",
          "settings": {
            "label": "In Positions",
            "balance": "5477000",
            "trend": "up",
            "trend_value": "234000",
            "trend_period": "24h"
          }
        }
      },
      "block_order": ["block1", "block2", "block3"],
      "settings": {
        "columns": 3
      }
    },
    "price-tickers": {
      "type": "price-ticker",
      "blocks": {
        "btc": { "type": "ticker", "settings": { "symbol": "BTC", "name": "Bitcoin", "price": "67,542.30", "change": "2.45" } },
        "eth": { "type": "ticker", "settings": { "symbol": "ETH", "name": "Ethereum", "price": "3,245.67", "change": "-1.23" } },
        "sol": { "type": "ticker", "settings": { "symbol": "SOL", "name": "Solana", "price": "178.92", "change": "5.67" } }
      },
      "block_order": ["btc", "eth", "sol"],
      "settings": {}
    }
  },
  "order": ["hero", "balance-widgets", "price-tickers"]
}
`

// Hero Banner Section
const heroBannerSectionLiquid = `{% comment %}
  Hero Banner Section
{% endcomment %}

<div class="max-w-7xl mx-auto px-6 py-8">
  <div class="rounded-2xl p-6 mb-6 border relative overflow-hidden
    {% if settings.enable_dark_mode %}
      bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-800
    {% else %}
      bg-gradient-to-r from-white via-slate-50 to-white border-slate-200
    {% endif %}">
    <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
    <div class="relative">
      <p class="text-sm font-medium mb-1 {% if settings.enable_dark_mode %}text-slate-400{% else %}text-slate-600{% endif %}">
        {{ section.settings.greeting | default: 'Good morning' }} 👋
      </p>
      <h2 class="text-2xl md:text-3xl font-bold tracking-tight {% if settings.enable_dark_mode %}text-white{% else %}text-slate-900{% endif %}">
        {{ section.settings.heading }}
        {% if section.settings.highlight_text != blank %}
          <span class="text-emerald-400">{{ section.settings.highlight_text }}</span>
        {% endif %}
      </h2>
      {% if section.settings.subheading != blank %}
        <p class="mt-2 {% if settings.enable_dark_mode %}text-slate-400{% else %}text-slate-600{% endif %}">
          {{ section.settings.subheading }}
        </p>
      {% endif %}
    </div>
  </div>
</div>

{% schema %}
{
  "name": "Hero Banner",
  "settings": [
    {
      "type": "text",
      "id": "greeting",
      "label": "Greeting",
      "default": "Good morning"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Your portfolio is up"
    },
    {
      "type": "text",
      "id": "highlight_text",
      "label": "Highlight text",
      "default": "+4.52% today"
    },
    {
      "type": "textarea",
      "id": "subheading",
      "label": "Subheading"
    }
  ],
  "presets": [
    {
      "name": "Hero Banner"
    }
  ]
}
{% endschema %}
`

// Main CSS
const fintechCss = `/* Fintech Pro Theme CSS */

/* Utilities */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}

/* Animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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

/* Hide scrollbar but keep functionality */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Dark mode styles */
.dark body {
  background-color: #0f172a;
  color: #f8fafc;
}

/* Focus styles */
.focus-none:focus {
  outline: none;
}

/* Skip link */
.skip-to-content-link {
  position: absolute;
  left: -9999px;
}

.skip-to-content-link:focus {
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}
`

// JavaScript
const fintechJs = `/**
 * Fintech Pro Theme JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  // Format currency helper
  window.formatCurrency = function(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Initialize price tickers with mock updates
  const tickers = document.querySelectorAll('[data-symbol]');
  if (tickers.length > 0) {
    setInterval(() => {
      tickers.forEach(ticker => {
        const priceEl = ticker.querySelector('.ticker-price');
        const changeEl = ticker.querySelector('.ticker-change');
        
        if (priceEl && changeEl) {
          const currentPrice = parseFloat(ticker.dataset.price.replace(/,/g, ''));
          const fluctuation = currentPrice * (Math.random() - 0.5) * 0.002;
          const newPrice = currentPrice + fluctuation;
          
          priceEl.textContent = '$' + newPrice.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        }
      });
    }, 5000);
  }
});
`

// Locales
const localesEnJson = `{
  "general": {
    "accessibility": {
      "skip_to_content": "Skip to content"
    }
  },
  "products": {
    "product": {
      "add_to_cart": "Add to cart"
    }
  }
}
`

// README
const shopifyReadmeContent = `# Fintech Pro - Shopify Theme

A modern fintech dashboard theme for Shopify with crypto widgets and financial components.

## Installation

1. Download and extract the theme zip file
2. Go to your Shopify admin > Online Store > Themes
3. Click "Upload theme" and select the zip file
4. Customize the theme using the Theme Editor

## Features

- Dark/Light mode
- Crypto price tickers
- Balance widgets
- Responsive design
- Liquid templating
- Section-based architecture

## Sections

- **Header** - Navigation and branding
- **Hero Banner** - Welcome message with stats
- **Balance Widget** - Display financial balances
- **Price Ticker** - Crypto price display
- **Footer** - Links and copyright

## Customization

Use the Shopify Theme Editor to:
- Set brand colors
- Toggle dark mode
- Configure sections and blocks
- Upload logo

## Requirements

- Shopify Online Store 2.0
- JSON templates support

## License

MIT License
`

export async function generateShopifyTheme(
  options: ShopifyGeneratorOptions = {}
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
      message: 'Preparing Shopify theme...'
    })

    const zip = new JSZip()
    const rootFolder = zip.folder('fintech-pro-shopify')!

    // Add config
    onProgress?.({
      status: 'generating',
      progress: 10,
      message: 'Adding configuration...'
    })

    const configFolder = rootFolder.folder('config')!
    configFolder.file('settings_schema.json', settingsSchemaJson)
    configFolder.file('settings_data.json', `{
  "current": {
    "color_primary": "#1E40AF",
    "color_accent": "#10B981",
    "enable_dark_mode": true
  }
}`)

    // Add layout
    onProgress?.({
      status: 'generating',
      progress: 20,
      message: 'Adding layout...'
    })

    const layoutFolder = rootFolder.folder('layout')!
    layoutFolder.file('theme.liquid', themeLiquid)

    // Add sections
    onProgress?.({
      status: 'generating',
      progress: 35,
      message: 'Adding sections...'
    })

    const sectionsFolder = rootFolder.folder('sections')!
    sectionsFolder.file('header.liquid', headerSectionLiquid)
    sectionsFolder.file('footer.liquid', footerSectionLiquid)
    sectionsFolder.file('balance-widget.liquid', balanceWidgetSectionLiquid)
    sectionsFolder.file('price-ticker.liquid', priceTickerSectionLiquid)
    sectionsFolder.file('hero-banner.liquid', heroBannerSectionLiquid)
    sectionsFolder.file('main-page.liquid', `<div class="page-content max-w-7xl mx-auto px-6 py-8">
  {{ page.content }}
</div>

{% schema %}
{
  "name": "Page Content",
  "settings": []
}
{% endschema %}`)

    // Add templates
    onProgress?.({
      status: 'generating',
      progress: 50,
      message: 'Adding templates...'
    })

    const templatesFolder = rootFolder.folder('templates')!
    templatesFolder.file('index.json', `{
  "sections": {
    "header": { "type": "header" },
    "hero": { "type": "hero-banner" },
    "balance": { "type": "balance-widget" },
    "tickers": { "type": "price-ticker" },
    "footer": { "type": "footer" }
  },
  "order": ["header", "hero", "balance", "tickers", "footer"]
}`)
    templatesFolder.file('page.json', pageTemplateJson)
    templatesFolder.file('404.json', `{
  "sections": {
    "main": {
      "type": "main-404",
      "settings": {}
    }
  },
  "order": ["main"]
}`)

    if (includePages) {
      templatesFolder.file('page.dashboard.json', dashboardTemplateJson)
    }

    // Add snippets
    const snippetsFolder = rootFolder.folder('snippets')!
    snippetsFolder.file('meta-tags.liquid', `{%- if page_description -%}
  <meta name="description" content="{{ page_description | escape }}">
{%- endif -%}

<meta property="og:site_name" content="{{ shop.name }}">
<meta property="og:title" content="{{ page_title | default: shop.name }}">
<meta property="og:type" content="website">
`)
    snippetsFolder.file('icon-arrow.liquid', `<svg class="icon icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
</svg>`)

    // Add assets
    onProgress?.({
      status: 'generating',
      progress: 65,
      message: 'Adding assets...'
    })

    const assetsFolder = rootFolder.folder('assets')!
    assetsFolder.file('fintech.css', fintechCss)
    assetsFolder.file('fintech.js', fintechJs)
    assetsFolder.file('tailwind.css', `/* Tailwind CSS - use CDN or compile separately */
@tailwind base;
@tailwind components;
@tailwind utilities;`)
    assetsFolder.file('constants.js', `window.Shopify = window.Shopify || {};
window.Shopify.theme = window.Shopify.theme || {};`)
    assetsFolder.file('pubsub.js', `// PubSub pattern for theme events
window.ThemePubSub = {
  events: {},
  subscribe: function(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
  publish: function(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
};`)
    assetsFolder.file('global.js', `// Global theme functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Fintech Pro theme loaded');
});`)

    // Add locales
    onProgress?.({
      status: 'generating',
      progress: 75,
      message: 'Adding locales...'
    })

    const localesFolder = rootFolder.folder('locales')!
    localesFolder.file('en.default.json', localesEnJson)

    // Add section groups
    const sectionGroupsFolder = rootFolder.folder('sections')!
    sectionGroupsFolder.file('header-group.json', `{
  "type": "header",
  "name": "Header group",
  "sections": {
    "header": {
      "type": "header",
      "settings": {}
    }
  },
  "order": ["header"]
}`)
    sectionGroupsFolder.file('footer-group.json', `{
  "type": "footer",
  "name": "Footer group",
  "sections": {
    "footer": {
      "type": "footer",
      "settings": {}
    }
  },
  "order": ["footer"]
}`)

    // Add documentation
    if (includeDocs) {
      onProgress?.({
        status: 'generating',
        progress: 85,
        message: 'Adding documentation...'
      })

      rootFolder.file('README.md', shopifyReadmeContent)
    }

    // Generate ZIP
    onProgress?.({
      status: 'generating',
      progress: 92,
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
      progress: 97,
      message: 'Starting download...'
    })

    saveAs(blob, 'fintech-pro-shopify-v1.0.0.zip')

    onProgress?.({
      status: 'complete',
      progress: 100,
      message: 'Download complete!'
    })

  } catch (error) {
    console.error('Error generating Shopify theme:', error)
    onProgress?.({
      status: 'error',
      progress: 0,
      message: error instanceof Error ? error.message : 'Failed to generate theme'
    })
    throw error
  }
}

