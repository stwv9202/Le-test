/**
 * DROPDOWN CATEGORIES IMPLEMENTATION EXAMPLE
 * 
 * This file demonstrates the complete code implementation for creating
 * dropdown navigation menus with categories in this Gatsby e-commerce theme.
 */

// ============================================================================
// STEP 1: Configure Categories in src/config.json
// ============================================================================

const configExample = {
  "headerLinks": [
    // Example 1: Shop menu with dropdown categories (ALREADY EXISTS)
    {
      "menuLabel": "Shop",
      "menuLink": "/shop",
      "category": [
        {
          "categoryLabel": "woman",
          "submenu": [
            { "menuLabel": "All clothing", "menuLink": "/shop" },
            { "menuLabel": "sweatshirts & hoodies", "menuLink": "/shop" },
            { "menuLabel": "jackets", "menuLink": "/shop" },
            { "menuLabel": "trousers", "menuLink": "/shop" }
          ]
        },
        {
          "categoryLabel": "men",
          "submenu": [
            { "menuLabel": "All clothing", "menuLink": "/shop" },
            { "menuLabel": "sweatshirts & hoodies", "menuLink": "/shop" },
            { "menuLabel": "jackets", "menuLink": "/shop" },
            { "menuLabel": "trousers", "menuLink": "/shop" },
            { "menuLabel": "pants", "menuLink": "/shop" }
          ]
        },
        {
          "categoryLabel": "accessories",
          "submenu": [
            { "menuLabel": "caps & scarves", "menuLink": "/shop" },
            { "menuLabel": "bags", "menuLink": "/shop" }
          ]
        }
      ]
    },

    // Example 2: Journal menu with dropdown categories (NEWLY ADDED)
    {
      "menuLabel": "journal",
      "menuLink": "/blog",
      "category": [
        {
          "categoryLabel": "Topics",
          "submenu": [
            { "menuLabel": "Fashion", "menuLink": "/blog" },
            { "menuLabel": "Lifestyle", "menuLink": "/blog" },
            { "menuLabel": "Design", "menuLink": "/blog" },
            { "menuLabel": "Sustainability", "menuLink": "/blog" }
          ]
        },
        {
          "categoryLabel": "Collections",
          "submenu": [
            { "menuLabel": "Latest Articles", "menuLink": "/blog" },
            { "menuLabel": "Popular Posts", "menuLink": "/blog" },
            { "menuLabel": "Editor's Picks", "menuLink": "/blog" }
          ]
        }
      ]
    },

    // Example 3: About menu with dropdown categories (NEWLY ADDED)
    {
      "menuLabel": "About",
      "menuLink": "/about",
      "category": [
        {
          "categoryLabel": "Company",
          "submenu": [
            { "menuLabel": "Our Story", "menuLink": "/about" },
            { "menuLabel": "Team", "menuLink": "/about" },
            { "menuLabel": "Careers", "menuLink": "/about" }
          ]
        },
        {
          "categoryLabel": "Support",
          "submenu": [
            { "menuLabel": "Contact Us", "menuLink": "/support#contact" },
            { "menuLabel": "FAQ", "menuLink": "/faq" },
            { "menuLabel": "Shipping & Returns", "menuLink": "/support#returns" }
          ]
        }
      ]
    },

    // Example 4: Menu item WITHOUT dropdown (set category to null)
    {
      "menuLabel": "Contact",
      "menuLink": "/contact",
      "category": null  // No dropdown will appear
    }
  ]
};

// ============================================================================
// STEP 2: Header Component Logic (src/components/Header/Header.js)
// ============================================================================

// The Header component automatically handles hover events:
const handleHover = (navObject) => {
  // Check if the menu item has categories
  if (navObject.category) {
    setShowMenu(true);              // Show the dropdown
    setMenu(navObject.category);    // Pass category data to ExpandedMenu
    setShowSearch(false);           // Hide search if open
  } else {
    setMenu(undefined);             // No dropdown for this item
  }
  setActiveMenu(navObject.menuLabel); // Highlight active menu item
};

// In the JSX, the nav items are mapped with hover detection:
const HeaderNavigation = () => (
  <nav
    role={'presentation'}
    onMouseLeave={() => {
      setShowMenu(false);  // Hide dropdown when mouse leaves nav area
    }}
  >
    {Config.headerLinks.map((navObject) => (
      <Link
        key={navObject.menuLink}
        onMouseEnter={() => handleHover(navObject)}  // Show dropdown on hover
        className={`${styles.navLink} ${
          activeMenu === navObject.menuLabel ? styles.activeLink : ''
        }`}
        to={navObject.menuLink}
      >
        {navObject.menuLabel}
      </Link>
    ))}
  </nav>
);

// ============================================================================
// STEP 3: ExpandedMenu Component (src/components/ExpandedMenu/ExpandedMenu.js)
// ============================================================================

// This component renders the dropdown content:
const ExpandedMenu = (props) => {
  const { menu } = props;

  // Don't render if no menu data
  if (menu === null || menu === undefined) return <React.Fragment />;
  
  return (
    <div className={styles.root}>
      <div className={styles.linkContainers}>
        {/* Map through each category */}
        {menu?.map((item, index) => {
          return (
            <div key={index} className={styles.categoryContainer}>
              {/* Category label (e.g., "woman", "men") */}
              <span className={styles.categoryName}>{item.categoryLabel}</span>
              
              {/* Submenu items under this category */}
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
      
      {/* Optional: Promotional images in dropdown */}
      <div className={styles.imageContainer}>
        <img src={toOptimizedImage('/headerPic1.png')} alt={'header 1'}></img>
        <img src={toOptimizedImage('/headerPic2.png')} alt={'header 2'}></img>
      </div>
    </div>
  );
};

// ============================================================================
// VISUAL STRUCTURE
// ============================================================================

/*
When you hover over a menu item with categories, this structure appears:

┌─────────────────────────────────────────────────────────────────────┐
│ Header                                                              │
│ [Shop*]  [Journal]  [About]                  [Search] [♥] [👤] [🛒] │
└─────────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ DROPDOWN MENU (appears when hovering over Shop*)                   │
├─────────────────────────────────────────┬───────────────────────────┤
│ woman                men                │                           │
│ • All clothing      • All clothing      │   [Promo Image 1]        │
│ • sweatshirts       • sweatshirts       │                           │
│ • jackets           • jackets           │   [Promo Image 2]        │
│ • trousers          • trousers          │                           │
│                     • pants             │                           │
│                                         │                           │
│ accessories                             │                           │
│ • caps & scarves                        │                           │
│ • bags                                  │                           │
└─────────────────────────────────────────┴───────────────────────────┘

Structure for Journal dropdown:
┌─────────────────────────────────────────┐
│ Topics              Collections         │
│ • Fashion           • Latest Articles   │
│ • Lifestyle         • Popular Posts     │
│ • Design            • Editor's Picks    │
│ • Sustainability                        │
└─────────────────────────────────────────┘

Structure for About dropdown:
┌─────────────────────────────────────────┐
│ Company             Support             │
│ • Our Story         • Contact Us        │
│ • Team              • FAQ               │
│ • Careers           • Shipping & Returns│
└─────────────────────────────────────────┘
*/

// ============================================================================
// KEY FEATURES
// ============================================================================

/*
✅ AUTOMATIC: No code changes needed - just edit config.json
✅ HOVER-ACTIVATED: Dropdown appears on mouse hover
✅ RESPONSIVE: Includes mobile navigation for touch devices
✅ FLEXIBLE: Support multiple categories with unlimited submenu items
✅ STYLED: Pre-styled with CSS modules
✅ ACCESSIBLE: Proper HTML structure with nav, ul, li elements

Current Status:
- Shop menu: HAS dropdown with woman/men/accessories categories ✅
- Journal menu: NOW HAS dropdown with Topics/Collections categories ✅
- About menu: NOW HAS dropdown with Company/Support categories ✅

ALL NAVIGATION ITEMS NOW HAVE CATEGORY DROPDOWNS!
*/

// ============================================================================
// HOW TO ADD MORE DROPDOWNS
// ============================================================================

/*
1. Open src/config.json
2. Find the "headerLinks" array
3. Add or modify any menu item with this structure:

{
  "menuLabel": "Your Menu Name",
  "menuLink": "/your-link",
  "category": [
    {
      "categoryLabel": "Category 1",
      "submenu": [
        { "menuLabel": "Item 1", "menuLink": "/link1" },
        { "menuLabel": "Item 2", "menuLink": "/link2" }
      ]
    },
    {
      "categoryLabel": "Category 2",
      "submenu": [
        { "menuLabel": "Item 3", "menuLink": "/link3" }
      ]
    }
  ]
}

4. Save the file
5. The dropdown will automatically work!

No other code changes are required.
*/

module.exports = {
  configExample,
  handleHover,
  HeaderNavigation,
  ExpandedMenu
};
