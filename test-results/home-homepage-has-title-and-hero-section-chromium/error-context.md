# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> homepage has title and hero section
- Location: e2e\home.spec.ts:3:1

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /FureIn/
Received string:  "Incentive.io"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    10 × unexpected value "Incentive.io"

```

```yaml
- link "Skip to main content":
  - /url: "#main-content"
- banner:
  - navigation "Main navigation":
    - link "I Incentive.io":
      - /url: /
    - link "Features":
      - /url: "#features"
    - link "Testimonials":
      - /url: "#testimonials"
    - link "Demo":
      - /url: "#demo"
    - link "FAQ":
      - /url: "#faq"
    - button "Toggle theme"
    - link "Sign In":
      - /url: /login
      - button "Sign In"
    - link "Get Started":
      - /url: /register
      - button "Get Started"
- main:
  - text: Now with AI-powered insights
  - heading "Sales Commission Made Simple" [level=1]
  - paragraph: Track, calculate, and pay commissions effortlessly. Streamline your sales team's incentives with intelligent automation.
  - link "Start Free Trial":
    - /url: /register
    - button "Start Free Trial"
  - link "View Demo":
    - /url: "#demo"
    - button "View Demo"
  - text: No credit card required 14-day free trial Cancel anytime
- text: Interactive Demo
- heading "See It In Action" [level=2]
- paragraph: Experience our powerful dashboards with real-time calculations and interactive visualizations
- button "Sales Executive"
- button "Sales Manager"
- button "Administrator"
- paragraph: Total Sales
- paragraph: ৳500K
- paragraph: Achievement
- paragraph: 100.0%
- text: Progress 100%
- paragraph: Commission Rate
- paragraph: 5%
- text: Eligible
- paragraph: Total Commission
- paragraph: ৳25,000
- paragraph: ৳3,900 pending
- text: Commission Calculator
- paragraph: Adjust your sales and see how it affects your commission
- text: Current Sales Amount (৳)
- spinbutton "Current Sales Amount (৳)": "500000"
- text: Sales Target (৳)
- spinbutton "Sales Target (৳)": "500000"
- text: "Your Commission ৳25,000 Rate: 5% Achievement: 100.0%"
- application: Jan Feb Mar Apr May Jun 0 75000 150000 225000 300000
- paragraph: Sales vs Commission Trends (6 months)
- heading "Commission Rates by Achievement" [level=4]
- text: "0-49% 0% 50-59% 2% 60-69% 3% 70-79% 4% 80-89% 5% 90%+ 5% Current: 100.0% → 5% Recent Sales"
- paragraph: Tech Corp
- paragraph: ৳45,000
- paragraph: ৳2,250
- text: Approved
- paragraph: Data Systems
- paragraph: ৳78,000
- paragraph: ৳3,900
- text: Pending
- paragraph: Cloud Solutions
- paragraph: ৳32,000
- paragraph: ৳1,600
- text: Approved
- paragraph: Ready to transform your commission management?
- button "Start Free Trial"
- button "Schedule Demo"
- paragraph: 40% Avg Productivity Boost
- paragraph: 50,000+ Active Users
- paragraph: Enterprise Security
- paragraph: "#1 Rated Platform"
- paragraph: Lightning Fast Setup
- paragraph: Available in 50+ Countries
- paragraph: Trusted by innovative companies worldwide
- text: TechCorp DataFlow Innovate GrowthPartners Enterprise Solutions SOC 2 Compliant GDPR Ready ISO 27001 Privacy Shield
- heading "Everything you need to manage commissions" [level=2]
- paragraph: Powerful features designed to simplify your commission management workflow and maximize your team's performance.
- heading "Real-time Tracking" [level=3]
- paragraph: Monitor sales performance in real-time with intuitive dashboards and detailed analytics.
- heading "Target Management" [level=3]
- paragraph: Set and track team targets with achievement percentages and progress indicators.
- heading "Smart Analytics" [level=3]
- paragraph: AI-powered insights to help you understand patterns and optimize your commission structure.
- heading "Automated Payouts" [level=3]
- paragraph: Streamline commission payments with automatic calculations and batch processing.
- heading "Secure & Compliant" [level=3]
- paragraph: Enterprise-grade security with role-based access control and audit trails.
- heading "Team Management" [level=3]
- paragraph: Manage multiple teams with hierarchical approval workflows and reporting.
- heading "Trusted by Sales Teams Worldwide" [level=2]
- paragraph: See what our customers have to say about transforming their commission management
- paragraph: "\"Incentive.io transformed how we manage commissions. Our sales team productivity increased by 40% within the first quarter. The automated calculations save us hours every week.\""
- text: SC
- paragraph: Sarah Chen
- paragraph: Sales Director, TechCorp
- paragraph: "\"The approval workflow is seamless. We've reduced payment processing time from weeks to just days. Our sales team loves the real-time dashboard visibility.\""
- text: MR
- paragraph: Michael Rahman
- paragraph: CEO, Global Sales Solutions
- paragraph: "\"Finally, a commission system that integrates with our existing accounting tools. The audit trails and reporting features have made compliance so much easier.\""
- text: JF
- paragraph: Jennifer Foster
- paragraph: Finance Manager, DataTech Inc
- paragraph: "\"The team management features are incredible. I can track my entire team's performance at a glance and provide targeted coaching where needed.\""
- text: DK
- paragraph: David Kim
- paragraph: Sales Manager, Innovate Ltd
- paragraph: "\"We've used many commission systems before, but Incentive.io is by far the most intuitive. Onboarding was quick and support has been exceptional.\""
- text: AP
- paragraph: Aisha Patel
- paragraph: HR Director, Enterprise Solutions
- paragraph: "\"The flexibility to customize commission rules for different teams has been a game-changer. We can now incentivize the behaviors that drive our business forward.\""
- text: RM
- paragraph: Robert Martinez
- paragraph: VP Sales, Growth Partners
- paragraph: 500+
- paragraph: Companies
- paragraph: 50K+
- paragraph: Sales Reps
- paragraph: $2B+
- paragraph: Commissions Paid
- paragraph: 99%
- paragraph: Satisfaction
- heading "Frequently Asked Questions" [level=2]
- paragraph: Have questions? We've got answers.
- button "How does commission calculation work?" [expanded]
- region:
  - paragraph: Our system automatically calculates commissions based on achievement percentage. Sales executives earn 2-5% depending on hitting 50%+ of their target. The calculation considers gross sales, applies any deductions (tax, VAT, EO/BP), and determines the commission rate based on achievement ranges.
- button "Can I customize commission rules?"
- button "Is there a free trial?"
- button "What payment methods do you accept?"
- button "Can I integrate with my existing tools?"
- paragraph:
  - text: Still have questions?
  - link "Contact our support team":
    - /url: mailto:support@incentive.io
- heading "Ready to streamline your commissions?" [level=2]
- paragraph: Join thousands of sales teams already using Incentive.io to manage their commissions effectively.
- link "Start Free Trial":
  - /url: /register
  - button "Start Free Trial"
- link "Request Demo":
  - /url: "#demo"
  - button "Request Demo"
- contentinfo:
  - link "I Incentive.io":
    - /url: /
  - paragraph: Sales commission management made simple.
  - link "Email support":
    - /url: mailto:hello@incentive.io
  - heading "Product" [level=4]
  - list:
    - listitem:
      - link "Features":
        - /url: "#features"
    - listitem:
      - link "Pricing":
        - /url: "#"
    - listitem:
      - link "Demo":
        - /url: "#demo"
    - listitem:
      - link "Integrations":
        - /url: "#"
  - heading "Company" [level=4]
  - list:
    - listitem:
      - link "About":
        - /url: "#"
    - listitem:
      - link "Blog":
        - /url: "#"
    - listitem:
      - link "Careers":
        - /url: "#"
    - listitem:
      - link "Contact":
        - /url: "#"
  - heading "Resources" [level=4]
  - list:
    - listitem:
      - link "Documentation":
        - /url: "#"
    - listitem:
      - link "API":
        - /url: "#"
    - listitem:
      - link "Guides":
        - /url: "#"
    - listitem:
      - link "Support":
        - /url: "#"
  - heading "Legal" [level=4]
  - list:
    - listitem:
      - link "Privacy":
        - /url: "#"
    - listitem:
      - link "Terms":
        - /url: "#"
    - listitem:
      - link "Security":
        - /url: "#"
    - listitem:
      - link "Cookies":
        - /url: "#"
  - text: © 2026 Incentive.io. All rights reserved.
- region "Notifications alt+T"
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('homepage has title and hero section', async ({ page }) => {
  4  |   await page.goto('/');
  5  | 
  6  |   // Expect a title "to contain" a substring.
> 7  |   await expect(page).toHaveTitle(/FureIn/);
     |                      ^ Error: expect(page).toHaveTitle(expected) failed
  8  | 
  9  |   // Check if the hero section heading is present
  10 |   const heroHeading = page.getByRole('heading', { level: 1 });
  11 |   await expect(heroHeading).toBeVisible();
  12 | });
  13 | 
```