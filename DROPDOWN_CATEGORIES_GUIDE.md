# Dropdown Categories Guide

This guide explains how the dropdown navigation system works in this Gatsby e-commerce theme and how to create dropdown menus for all categories.

## Overview

The theme includes a fully functional dropdown menu system that displays categories when hovering over navigation items. The "Shop" menu item already demonstrates this functionality with women, men, and accessories categories.

## How It Works

### 1. Configuration (`src/config.json`)

Categories are defined in the `headerLinks` array:

```json
{
  "headerLinks": [
    {
      "menuLabel": "Shop",
      "menuLink": "/shop",
      "category": [
        {
          "categoryLabel": "woman",
          "submenu": [
            {
              "menuLabel": "All clothing",
              "menuLink": "/shop"
            },
            {
              "menuLabel": "sweatshirts & hoodies",
              "menuLink": "/shop"
            }
          ]
        }
      ]
    }
  ]
}
```

### 2. Header Component (`src/components/Header/Header.js`)

The Header component handles the dropdown logic:

- **Hover Detection**: When hovering over a nav link, `handleHover()` checks if it has a `category` property
- **State Management**: Uses `menu` state to store current category data
- **Display Control**: The `showMenu` state controls dropdown visibility

```javascript
const handleHover = (navObject) => {
  if (navObject.category) {
    setShowMenu(true);
    setMenu(navObject.category);
    setShowSearch(false);
  } else {
    setMenu(undefined);
  }
  setActiveMenu(navObject.menuLabel);
};
```

### 3. ExpandedMenu Component (`src/components/ExpandedMenu/ExpandedMenu.js`)

This component renders the dropdown content:

```javascript
const ExpandedMenu = (props) => {
  const { menu } = props;

  if (menu === null || menu === undefined) return <React.Fragment />;
  
  return (
    <div className={styles.root}>
      <div className={styles.linkContainers}>
        {menu?.map((item, index) => {
          return (
            <div key={index} className={styles.categoryContainer}>
              <span className={styles.categoryName}>{item.categoryLabel}</span>
              <ul>
                {item.submenu.map((link, linkIndex) => {
                  return (
                    <li key={linkIndex}>
                      <Link className={styles.menuLink} to={link.menuLink}>
                        {link.menuLabel}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className={styles.imageContainer}>
        <img src={toOptimizedImage('/headerPic1.png')} alt={'header 1'}></img>
        <img src={toOptimizedImage('/headerPic2.png')} alt={'header 2'}></img>
      </div>
    </div>
  );
};
```

## How to Add Dropdown to All Categories

### Step 1: Edit `src/config.json`

Add a `category` property to any `headerLinks` item that should have a dropdown:

```json
{
  "headerLinks": [
    {
      "menuLabel": "Shop",
      "menuLink": "/shop",
      "category": [
        {
          "categoryLabel": "woman",
          "submenu": [
            {"menuLabel": "All clothing", "menuLink": "/shop"},
            {"menuLabel": "sweatshirts & hoodies", "menuLink": "/shop"}
          ]
        },
        {
          "categoryLabel": "men",
          "submenu": [
            {"menuLabel": "All clothing", "menuLink": "/shop"},
            {"menuLabel": "jackets", "menuLink": "/shop"}
          ]
        }
      ]
    },
    {
      "menuLabel": "journal",
      "menuLink": "/blog",
      "category": [
        {
          "categoryLabel": "Topics",
          "submenu": [
            {"menuLabel": "Fashion", "menuLink": "/blog/fashion"},
            {"menuLabel": "Lifestyle", "menuLink": "/blog/lifestyle"},
            {"menuLabel": "Design", "menuLink": "/blog/design"}
          ]
        },
        {
          "categoryLabel": "Recent",
          "submenu": [
            {"menuLabel": "Latest Posts", "menuLink": "/blog/latest"},
            {"menuLabel": "Popular", "menuLink": "/blog/popular"}
          ]
        }
      ]
    },
    {
      "menuLabel": "About",
      "menuLink": "/about",
      "category": null
    }
  ]
}
```

### Step 2: The Header Component Automatically Handles It

No code changes needed! The Header component already:
- Detects hover events
- Checks for the `category` property
- Displays the dropdown menu
- Handles mouse leave events to hide the menu

## Example: Adding a Complete New Category Dropdown

To add a dropdown for a "Collections" menu item:

```json
{
  "menuLabel": "Collections",
  "menuLink": "/collections",
  "category": [
    {
      "categoryLabel": "Seasonal",
      "submenu": [
        {"menuLabel": "Spring Collection", "menuLink": "/collections/spring"},
        {"menuLabel": "Summer Collection", "menuLink": "/collections/summer"},
        {"menuLabel": "Fall Collection", "menuLink": "/collections/fall"},
        {"menuLabel": "Winter Collection", "menuLink": "/collections/winter"}
      ]
    },
    {
      "categoryLabel": "Special",
      "submenu": [
        {"menuLabel": "Limited Edition", "menuLink": "/collections/limited"},
        {"menuLabel": "Collaborations", "menuLink": "/collections/collabs"},
        {"menuLabel": "Sustainable", "menuLink": "/collections/sustainable"}
      ]
    },
    {
      "categoryLabel": "Best Sellers",
      "submenu": [
        {"menuLabel": "Top 10", "menuLink": "/collections/top-10"},
        {"menuLabel": "Customer Favorites", "menuLink": "/collections/favorites"}
      ]
    }
  ]
}
```

## Customization

### Styling

The dropdown appearance is controlled by:
- `src/components/Header/Header.module.css` - Header and dropdown container
- `src/components/ExpandedMenu/ExpandedMenu.module.css` - Dropdown content styling

### Images

The dropdown includes promotional images on the right side. You can customize these in `ExpandedMenu.js`:

```javascript
<div className={styles.imageContainer}>
  <img src={toOptimizedImage('/your-image-1.png')} alt={'promo 1'}></img>
  <img src={toOptimizedImage('/your-image-2.png')} alt={'promo 2'}></img>
</div>
```

## Mobile Navigation

For mobile devices, categories are handled by the `MobileNavigation` component, which provides a different UI pattern optimized for touch screens.

## Summary

The dropdown system is:
- ✅ **Already implemented** and working
- ✅ **Configuration-based** - just edit `config.json`
- ✅ **Automatic** - no code changes needed to add new dropdowns
- ✅ **Flexible** - supports multiple categories and unlimited submenu items
- ✅ **Responsive** - includes mobile-specific navigation

To add dropdowns to all your categories, simply add the `category` property with your desired structure to any item in the `headerLinks` array in `src/config.json`.
