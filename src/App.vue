<script lang="ts">
import { defineComponent } from 'vue';
import ContactModal from './modal/ContactModal.vue';

export default defineComponent({
    components: { ContactModal },
    data() {
        return {
            currentYear: new Date().getFullYear(),
            showModal: false,
            modalTitle: "",
            modalText: "",
        };
    },
    methods: {
        openModal(text: string, title: string) {
            this.modalText = text;
            this.modalTitle = title;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape" && this.showModal) {
                this.closeModal();
            }
        },
    },
    mounted() {
        window.addEventListener("keydown", this.handleEscape);
    },
    beforeUnmount() {
        window.removeEventListener("keydown", this.handleEscape);
    },
});
</script>

<template>
    <div class="page">
        <div class="page-overlay"></div>

        <header class="site-header">
            <div class="header-top">
                <div class="header-inner">
                    <div class="brand">
                        <div class="brand-logo">AP</div>
                        <div class="brand-name">Aidan Powell</div>
                    </div>
                    <nav class="header-utility">
                        <a href="https://www.linkedin.com/in/aidanpowell/" target="_blank" rel="noopener">
                            <svg class="ic" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 18.34H5.67V9.67h2.67v8.67zM7 8.5a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.34 9.84h-2.67V14c0-.95-.02-2.17-1.32-2.17-1.32 0-1.52 1.03-1.52 2.1v4.41h-2.67V9.67h2.56v1.18h.04c.36-.68 1.23-1.4 2.54-1.4 2.71 0 3.21 1.78 3.21 4.1v4.79z"/>
                            </svg>
                            <span>LinkedIn</span>
                        </a>
                        <span class="header-sep"></span>
                        <a href="#" @click.prevent="openModal('PowellDAidan@Yahoo.com', 'Email')">
                            <svg class="ic" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            <span>Contact</span>
                        </a>
                    </nav>
                </div>
            </div>
            <div class="header-bottom">
                <div class="header-inner">
                    <nav class="primary-nav">
                        <a href="#home" class="nav-tab nav-tab-active">Home</a>
                        <a href="#experience" class="nav-tab">Experience</a>
                        <a href="#education" class="nav-tab">Education</a>
                        <a href="#contact" class="nav-tab">Contact</a>
                    </nav>
                </div>
            </div>
        </header>

        <section id="home" class="hero">
            <div class="hero-inner">
                <h1 class="hero-title">Aidan Powell</h1>
                <p class="hero-tagline">Global Logistics Management graduate &middot; Supply chain &amp; operations.</p>
                <div class="hero-about">
                    <p>Hi, I'm Aidan. I recently graduated <em>summa cum laude</em> from the W.P. Carey School of Business at Arizona State University with a B.A. in Global Logistics Management.</p>
                    <p>My background in global logistics management and business from Arizona State University has shaped my fascination and deep study into how supply chain and procurement shape and support both businesses and the people they serve. Now, as part of a large medical procurement network, I'm incredibly grateful to apply those skills in such a meaningful way&mdash;supporting our Veterans and helping ensure great care for our nation's protectors!</p>
                </div>
            </div>
        </section>

        <main class="site-main">

            <section id="experience" class="panel">
                <div class="panel-header">
                    <svg class="panel-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM10 5h4v2h-4V5zm10 14H4v-5h5v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1h5v5zm0-7h-5v-1a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1H4V9h16v3z"/>
                    </svg>
                    <h2>Professional Experience</h2>
                </div>
                <div class="panel-body">
                    <p class="panel-intro">Where I've been putting my skills to work.</p>
                    <div class="card-grid">
                        <div class="card">
                            <div class="card-icon card-icon-blue">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7h-4V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM10 5h4v2h-4V5zm10 14H4V9h16v10z"/></svg>
                            </div>
                            <div class="card-body">
                                <div class="card-title-row">
                                    <h3>Procurement Associate</h3>
                                    <span class="badge badge-green">Current</span>
                                </div>
                                <p class="card-meta">Arizona DVS &middot; Phoenix, AZ &middot; Nov 2025 &ndash; Present</p>
                                <ul class="card-list">
                                    <li>Built a custom inventory ERP system by hand that led to outbound scanning time taking seconds, which gave way to the introduction of vendor-level inventory analytics, improving warehouse efficiency and purchasing decisions.</li>
                                    <li>Processed vendor invoices, PO's, and internal customer requests for both ASVH-P &amp; AVMC-CN using all available vendors and procurement methods, leading to a <strong>25&ndash;50% decrease</strong> for the majority of items being requested.</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="card">
                            <div class="card-icon card-icon-amber">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6h-3V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zM10 4h4v2h-4V4zm9 15H5V8h14v11z"/></svg>
                            </div>
                            <div class="card-body">
                                <div class="card-title-row">
                                    <h3>Sales Associate</h3>
                                </div>
                                <p class="card-meta">Staples &middot; Chandler, AZ &middot; Nov 2022 &ndash; Nov 2025</p>
                                <ul class="card-list">
                                    <li>Supported a <strong>40% reduction in inventory shrinkage</strong> over two years by implementing cycle counts, zero balancing, and precise IMS adjustments, reflecting true store inventory levels.</li>
                                    <li>Managed USPS, UPS, FedEx, &amp; DHL package intakes maintaining a 30-minute pickup turnaround for customers.</li>
                                    <li>Directly oversaw USPS mail intake, shipping, shredding, mailbox creation, customer pickups, and consolidations. Enabled global Ipostal customers at our store to access their mail within 2 hours, driving a <strong>15% increase in customer acquisition</strong>.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="education" class="panel">
                <div class="panel-header">
                    <svg class="panel-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 13L4.5 11.95v3.45L12 19.5l7.5-4.1V11.95L12 16z"/>
                    </svg>
                    <h2>Education</h2>
                </div>
                <div class="panel-body">
                    <p class="panel-intro">Coursework, honors, and accreditations.</p>
                    <div class="card-grid">
                        <div class="card">
                            <div class="card-icon card-icon-blue">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
                            </div>
                            <div class="card-body">
                                <h3>W.P. Carey School of Business, ASU</h3>
                                <p class="card-meta">Tempe, AZ &middot; December 2024</p>
                                <p><strong>B.A. in Global Logistics Management</strong></p>
                                <ul class="card-list">
                                    <li>GPA: <strong>4.00</strong> &middot; Summa Cum Laude</li>
                                    <li>AACSB Accredited</li>
                                    <li>Dean's List: Spring 2023, Fall 2023, Spring 2024, Fall 2024</li>
                                </ul>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-icon card-icon-green">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
                            </div>
                            <div class="card-body">
                                <h3>Chandler-Gilbert Community College</h3>
                                <p class="card-meta">Chandler, AZ &middot; December 2022</p>
                                <p><strong>Associate in Business</strong></p>
                                <ul class="card-list">
                                    <li>GPA: <strong>3.61</strong> &middot; Cum Laude</li>
                                    <li>Dean's List: Fall 2020, Spring 2021, Fall 2021, Spring 2022, Fall 2022</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="skills" class="panel">
                <div class="panel-header">
                    <svg class="panel-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2z"/>
                    </svg>
                    <h2>Technical Skills</h2>
                </div>
                <div class="panel-body">
                    <p class="panel-intro">Tools and systems I work with day-to-day.</p>
                    <div class="skills-grid">
                        <div class="skill-group">
                            <h4>Systems</h4>
                            <ul class="tag-list">
                                <li>Internal Procurement Portals</li>
                                <li>Punchout Systems</li>
                                <li>Inventory Management Systems</li>
                                <li>Return Management Systems</li>
                                <li>Point of Sale Systems</li>
                                <li>Barcode / UPC / QR scanning</li>
                            </ul>
                        </div>
                        <div class="skill-group">
                            <h4>Software</h4>
                            <ul class="tag-list">
                                <li>Microsoft Excel</li>
                                <li>Tableau</li>
                                <li>MiniTab</li>
                                <li>Microsoft Visio</li>
                                <li>Adobe Acrobat</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="projects" class="panel">
                <div class="panel-header">
                    <svg class="panel-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9.5 14.25 6.25 11l-1.42 1.41L9.5 17.08l10-10-1.41-1.41z"/>
                    </svg>
                    <h2>Academic Projects &amp; Activities</h2>
                </div>
                <div class="panel-body">
                    <p class="panel-intro">Coursework, simulations, and clubs.</p>
                    <div class="card-grid">
                        <div class="card">
                            <div class="card-icon card-icon-blue">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
                            </div>
                            <div class="card-body">
                                <h3>The Supply Chain Game</h3>
                                <p>Coordinated with teammates to simulate a business unit, optimizing production schedules and outpacing both peer teams and a static control unit. Managed inventory across multiple simulated regions while reacting to fluctuating demand and market conditions.</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-icon card-icon-green">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 8h-2.81a5.985 5.985 0 0 0-1.82-1.96L17 4.41 15.59 3l-2.17 2.17a6.002 6.002 0 0 0-2.83 0L8.41 3 7 4.41l1.62 1.63A6 6 0 0 0 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81a6 6 0 0 0 10.38 0H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8z"/></svg>
                            </div>
                            <div class="card-body">
                                <h3>Astro Seed Supply Chain Analysis</h3>
                                <p>Presented a deep-dive on building an agricultural supply chain around the Terra Pod &mdash; covering intermodal containerization, component sourcing, and the federal &amp; state regulations that apply. Recommended a manufacturing location based on infrastructure access, material channels, climate, and local market demographics.</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-icon card-icon-amber">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1H6.32c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
                            </div>
                            <div class="card-body">
                                <h3>Capital Budgeting Case</h3>
                                <p>Built a target report for a fabrication lab, calculating annual net cash inflows, accounting rate of return, payback period, and net present value &mdash; delivered as a memo to a college president evaluating the investment.</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-icon card-icon-blue">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                            </div>
                            <div class="card-body">
                                <h3>Sun Devil Stock Exchange</h3>
                                <p class="card-meta">Club Member &middot; Tempe, AZ &middot; Jun 2022 &ndash; Dec 2023</p>
                                <p>Studied how financial data shapes business ownership decisions and explored a range of trading and investing strategies through the stock market.</p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-icon card-icon-green">
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                            </div>
                            <div class="card-body">
                                <h3>CGCC Coding Club</h3>
                                <p class="card-meta">Club Member &middot; Chandler, AZ &middot; Jan 2022 &ndash; Dec 2022</p>
                                <p>Worked alongside the club president to explore practical applications of programming inside a business environment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" class="panel">
                <div class="panel-header">
                    <svg class="panel-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <h2>Contact</h2>
                </div>
                <div class="panel-body">
                    <p class="panel-intro">
                        The fastest way to reach me is through
                        <a href="#" @click.prevent="openModal('PowellDAidan@Yahoo.com', 'Email')" class="text-link">Email</a>
                        or
                        <a href="https://www.linkedin.com/in/aidanpowell/" target="_blank" rel="noopener" class="text-link">LinkedIn</a>.
                        Click the buttons below to get my contact details.
                    </p>
                    <div class="contact-buttons">
                        <a href="#" @click.prevent="openModal('PowellDAidan@Yahoo.com', 'Email')" class="btn-glossy btn-glossy-primary">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                            <span>Email Me</span>
                        </a>
                        <a href="https://www.linkedin.com/in/aidanpowell/" target="_blank" rel="noopener" class="btn-glossy">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 18.34H5.67V9.67h2.67v8.67zM7 8.5a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.34 9.84h-2.67V14c0-.95-.02-2.17-1.32-2.17-1.32 0-1.52 1.03-1.52 2.1v4.41h-2.67V9.67h2.56v1.18h.04c.36-.68 1.23-1.4 2.54-1.4 2.71 0 3.21 1.78 3.21 4.1v4.79z"/></svg>
                            <span>LinkedIn</span>
                        </a>
                    </div>
                </div>
            </section>

        </main>

        <footer class="site-footer">
            <div class="footer-inner">
                <p>&copy; 2025&ndash;{{ currentYear }} Aidan Powell. All rights reserved.</p>
            </div>
        </footer>

        <ContactModal
            :show="showModal"
            :title="modalTitle"
            :text="modalText"
            @close="closeModal"
        />
    </div>
</template>

<style lang="less" scoped>
@brand-blue: #1f5fa8;
@brand-blue-dark: #0d3a6b;
@border-blue: #b8d4ec;

.page {
    min-height: 100vh;
    min-height: 100dvh;
    font-family: "Segoe UI", "Tahoma", "Verdana", sans-serif;
    font-size: 14px;
    color: #333;
    position: relative;
    overflow-x: clip;
}

.page-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
}

.ic {
    width: 16px;
    height: 16px;
    fill: currentColor;
    flex-shrink: 0;
}

.site-header {
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(20, 50, 90, .35);
    
    .header-top {
        background: linear-gradient(180deg, #5fa1d9 0%, #2a72b9 50%, #226aae 51%, #154a82 100%);
        border-top: 1px solid #82b8e2;
        border-bottom: 1px solid @brand-blue-dark;
    }

    .header-inner {
        max-width: 1180px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 24px;
        padding-bottom: 1px;
    }

    .brand {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .brand-logo {
        width: 34px;
        height: 34px;
        border-radius: 4px;
        background: linear-gradient(180deg, #fff 0%, #d8e8f5 50%, #b8d4ec 51%, #92b9d8 100%);
        border: 1px solid #6a9bc4;
        color: @brand-blue-dark;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 13px;
        letter-spacing: .5px;
        text-shadow: 0 1px 0 rgba(255, 255, 255, .8);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, .9);
    }

    .brand-name {
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        text-shadow: 0 1px 1px rgba(0, 0, 0, .45);
        letter-spacing: .2px;
    }

    .header-utility {
        display: flex;
        gap: 2px;
        align-items: center;

        a {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #fff;
            text-decoration: none;
            font-size: 13px;
            padding: 6px 12px;
            border-radius: 3px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, .4);
            transition: background-color .15s ease;

            &:hover {
                background: rgba(255, 255, 255, .18);
            }
        }
    }

    .header-sep {
        width: 1px;
        height: 18px;
        background: rgba(255, 255, 255, .3);
        margin: 0 4px;
    }

    .header-bottom {
        background: linear-gradient(180deg, #f7fbfe 0%, #dceaf6 100%);
        border-bottom: 1px solid #92b9d8;
    }

    .primary-nav {
        display: flex;
        height: 38px;
        align-items: stretch;
        gap: 2px;
    }

    .nav-tab {
        display: inline-flex;
        align-items: center;
        padding: 0 18px;
        color: @brand-blue;
        text-decoration: none;
        font-size: 13px;
        font-weight: 600;
        border: 1px solid transparent;
        border-bottom: 0;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin-top: 4px;
        transition: background .15s ease, border-color .15s ease;

        &:hover {
            background: linear-gradient(180deg, #fff 0%, #e6f0fa 100%);
            border-color: @border-blue;
        }
    }

    .nav-tab.nav-tab-active {
        background: #fff;
        border-color: #92b9d8;
        margin-bottom: -1px;
        color: @brand-blue-dark;
        box-shadow: inset 0 2px 0 @brand-blue;
    }
}

.hero {
    position: relative;
    z-index: 3;
    padding: 56px 24px 40px;
    text-align: center;

    .hero-inner {
        max-width: 1180px;
        margin: 0 auto;
        background: linear-gradient(180deg, rgba(255, 255, 255, .92) 0%, rgba(245, 250, 254, .92) 100%);
        border: 1px solid @border-blue;
        border-radius: 6px;
        padding: 40px 32px;
        box-shadow: 0 4px 14px rgba(20, 50, 90, .18), inset 0 1px 0 rgba(255, 255, 255, .95);
    }

    .hero-title {
        margin: 0 0 8px 0;
        font-size: 38px;
        font-weight: 300;
        color: @brand-blue-dark;
        letter-spacing: -.5px;
    }

    .hero-tagline {
        margin: 0 0 20px 0;
        font-size: 17px;
        color: #4a6985;
        font-weight: 400;
    }

    .hero-about {
        border-top: 1px solid #d4e6f5;
        padding-top: 18px;
        max-width: 680px;
        margin: 0 auto;
        text-align: left;

        p {
            margin: 0 0 10px 0;
            font-size: 14px;
            color: #4a6985;
            line-height: 1.6;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

.site-main {
    position: relative;
    z-index: 3;
    max-width: 1180px;
    margin: 0 auto;
    padding: 8px 24px 48px;
}

.panel {
    background: #fff;
    border: 1px solid @border-blue;
    border-radius: 6px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(20, 50, 90, .12);
    overflow: hidden;

    .panel-header {
        background: linear-gradient(180deg, #e7f1fa 0%, #c8dff2 50%, #b8d4ec 51%, #a4c8e5 100%);
        border-bottom: 1px solid #92b9d8;
        padding: 10px 18px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: @brand-blue-dark;

        h2 {
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            text-shadow: 0 1px 0 rgba(255, 255, 255, .7);
            letter-spacing: .2px;
        }
    }

    .panel-icon {
        width: 20px;
        height: 20px;
        fill: @brand-blue;
        flex-shrink: 0;
        filter: drop-shadow(0 1px 0 rgba(255, 255, 255, .7));
    }

    .panel-body {
        padding: 22px;
    }

    .panel-intro {
        margin: 0 0 18px 0;
        font-size: 14px;
        color: #4a6985;
    }
}

.text-link {
    color: #00549e;
    text-decoration: none;
    font-weight: 600;

    &:hover {
        text-decoration: underline;
        color: #0072c6;
    }
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 14px;
}

.card {
    display: flex;
    gap: 12px;
    padding: 14px;
    background: linear-gradient(180deg, #fff 0%, #f5f9fd 100%);
    border: 1px solid #d4e2ed;
    border-radius: 5px;
    text-decoration: none;
    color: inherit;
    transition: border-color .15s ease, background .15s ease, box-shadow .15s ease;

    &:hover {
        border-color: @brand-blue;
        background: linear-gradient(180deg, #fff 0%, #eaf4fd 100%);
        box-shadow: 0 2px 8px rgba(20, 80, 160, .15);
    }

    h3 {
        margin: 0 0 4px 0;
        font-size: 15px;
        font-weight: 700;
        color: @brand-blue-dark;
    }

    p {
        margin: 0 0 8px 0;
        font-size: 13px;
        color: #555f6b;
        line-height: 1.5;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .card-meta {
        font-size: 12.5px;
        color: #6b8aab;
        font-style: italic;
    }
}

.card-icon {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .7), 0 1px 2px rgba(0, 0, 0, .2);
    border: 1px solid rgba(0, 0, 0, .18);

    svg {
        width: 22px;
        height: 22px;
        fill: currentColor;
    }
}

.card-icon-blue {
    background: linear-gradient(180deg, #6aa9dc 0%, #2c75bb 50%, #226aae 51%, #154a82 100%);
}

.card-icon-green {
    background: linear-gradient(180deg, #8ac164 0%, #4f9c2a 50%, #468722 51%, #2e6515 100%);
}

.card-icon-amber {
    background: linear-gradient(180deg, #f5c45e 0%, #e09a1c 50%, #c98714 51%, #9a6505 100%);
}

.card-body {
    flex: 1;
    min-width: 0;
}

.card-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
    flex-wrap: wrap;

    h3 {
        margin: 0;
    }
}

.card-list {
    margin: 6px 0 0 0;
    padding-left: 18px;
    font-size: 13px;
    color: #555f6b;
    line-height: 1.5;

    li {
        margin-bottom: 4px;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

.badge {
    display: inline-block;
    padding: 1px 7px;
    font-size: 10.5px;
    font-weight: 700;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: .4px;
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, .25);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .4);
}

.badge-green {
    background: linear-gradient(180deg, #8ac164 0%, #4f9c2a 100%);
    border: 1px solid #2e6515;
}

.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
}

.skill-group {
    h4 {
        margin: 0 0 10px 0;
        font-size: 13px;
        font-weight: 700;
        color: @brand-blue-dark;
        text-transform: uppercase;
        letter-spacing: .6px;
    }
}

.tag-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    li {
        display: inline-block;
        padding: 4px 10px;
        background: linear-gradient(180deg, #fff 0%, #e8f2fb 100%);
        border: 1px solid #b8d4ec;
        border-radius: 3px;
        font-size: 12.5px;
        color: @brand-blue-dark;
        font-weight: 600;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, .9);
    }
}

.contact-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.btn-glossy {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 16px;
    background: linear-gradient(180deg, #fff 0%, #e8f2fb 50%, #d4e6f5 51%, #c2dcef 100%);
    border: 1px solid #7eaed1;
    border-radius: 4px;
    color: @brand-blue;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .85);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .95), 0 1px 2px rgba(0, 0, 0, .08);
    transition: background .15s ease, border-color .15s ease;

    svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
    }

    &:hover {
        background: linear-gradient(180deg, #fff 0%, #f0f7fc 50%, #dceaf6 51%, #c8dff2 100%);
        border-color: @brand-blue;
        color: @brand-blue-dark;
    }

    &:active {
        background: linear-gradient(180deg, #c2dcef 0%, #d4e6f5 50%, #e8f2fb 51%, #fff 100%);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, .15);
    }
}

.btn-glossy-primary {
    background: linear-gradient(180deg, #6aa9dc 0%, #2c75bb 50%, #226aae 51%, #154a82 100%);
    border-color: @brand-blue-dark;
    color: #fff;
    text-shadow: 0 1px 0 rgba(0, 0, 0, .4);

    &:hover {
        background: linear-gradient(180deg, #7fb6e2 0%, #3782c5 50%, #2974b8 51%, #1a5594 100%);
        color: #fff;
    }

    &:active {
        background: linear-gradient(180deg, #154a82 0%, #226aae 50%, #2c75bb 51%, #6aa9dc 100%);
    }
}

.site-footer {
    position: relative;
    z-index: 3;
    background: linear-gradient(180deg, rgba(255, 255, 255, .85) 0%, rgba(232, 243, 252, .9) 100%);
    border-top: 1px solid @border-blue;
    margin-top: 24px;

    .footer-inner {
        max-width: 1180px;
        margin: 0 auto;
        padding: 18px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
        color: #4a6985;
        font-size: 12.5px;

        p {
            margin: 0;
        }
    }

    .footer-meta {
        color: #6b8aab;
    }
}

@media (max-width: 768px) {
    .site-header .header-utility span {
        display: none;
    }

    .hero .hero-title {
        font-size: 28px;
    }

    .hero .hero-tagline {
        font-size: 15px;
    }

    .panel .panel-body {
        padding: 16px;
    }

    .site-header .nav-tab {
        padding: 0 12px;
        font-size: 12.5px;
    }

    .site-header .header-inner {
        padding: 0 16px;
    }
}

@media (max-width: 480px) {
    .site-header .brand-name {
        font-size: 15px;
    }

    .hero {
        padding: 32px 16px 24px;
    }

    .hero .hero-inner {
        padding: 24px 18px;
    }
}
</style>
