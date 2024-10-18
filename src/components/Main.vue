<template>
    <div class="container">
        <div class="main-pane">
            <div v-for="(section, index) in sections" :key="section.key" class="resume-part">
                <h1 @click="setActivePart(section.key)">{{ section.title }}</h1>
                <hr />
                <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
                    <div v-show="activePart === section.key" class="section-content">
                        <!-- Content for each section -->
                        <template v-if="section.key === 'professional_experience'">
                            <!-- Professional Experience content -->
                            <p>
                                <b>Sales Associate</b>, Staples, Chandler, AZ
                                <br>November 2022 - Current
                            </p>
                            <ul>
                                <li>
                                    Zero balanced and cycle counted floor inventory, down-stocked and up-stocked
                                    inventory, and increased or decreased inventory
                                    data points within our IMS to better reflect true store inventory levels.
                                </li>
                                <li>
                                    Received online orders in-store daily and ordered products for customers from
                                    Staples’ IMS coming from the Tolleson DC to
                                    allow the flow of goods from B2C; as well as received freight on a weekly basis by
                                    tractor trailer loaded on pallets.
                                </li>
                                <li>
                                    Utilized RFID scanners and store RMS’ to enable reverse logistics for companies such
                                    as Amazon, Express by Optoro, Happy
                                    Returns, USPS, and UPS.
                                </li>
                                <li>
                                    Shipped products using in-store software domestically through UPS, collecting
                                    customer information as well as package
                                    information such as product type, weight, dimensions, addresses, and shipment
                                    methods.
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="section.key === 'technical_skills'">
                            <ul>
                                <li>
                                    Languages: Fluent in spoken and written English, intermediate in written French.
                                </li>
                                <li>
                                    Programs: Microsoft Excel; Tableau; MiniTab; Microsoft Visio.
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="section.key === 'academic_projects'">
                            <h2>The Supply Chain Game</h2>
                            <ul>
                                <li>
                                    Worked with several teammates, who combined, initiated decisions and simulated a
                                    business unit working together to
                                    enhance a simulated company’s production schedule and related processes relative to
                                    competing units, as well as against a
                                    simulated unit which makes no decisions over the same period; of which my business
                                    unit outpaced.
                                </li>
                                <li>
                                    Assessed the supply channels of a product over the course of several simulated years
                                    on a daily basis with fluctuating daily
                                    demand and overarching market conditions.
                                </li>
                                <li>
                                    Increased or modified inventory levels of multiple factories across several
                                    simulated regions and determined whether and
                                    what to invest or divest in, when to make decisions, and if those decisions yield
                                    favorable results for the company through
                                    different delivery methods; mainly mail or truck.
                                </li>
                            </ul>
                            <h2>Astro Seed Supply Chain and Manufacturing Analysis&nbsp;/&nbsp;Recommendations</h2>
                            <ul>
                                <li>
                                    Presented and gave insight into and explaining the complexities of creating an
                                    agricultural supply chain through their
                                    product, the Terra Pod. This presentation included how containers and
                                    containerization worked in an intermodal fashion,
                                    component resources for the Terra Pod, as well as Federal and State regulations
                                    which may apply to this product.
                                </li>
                                <li>
                                    Offered and presented information about a manufacturing location for the Terra Pod,
                                    principally overlooking proximity to
                                    infrastructure, domestic material channels, weather, and demographics of local
                                    hyper-competitive markets.
                                </li>
                            </ul>
                            <h2>Capital Budgeting Case</h2>
                            <ul>
                                <li>
                                    Presented a mock target report which explained net cash in-flows each year;
                                    displayed accounting rate of return, payback
                                    period, and net-present-value for a fabrication lab with a memo to a college
                                    president who is requesting analysis.
                                </li>
                            </ul>
                        </template>
                        <template v-else-if="section.key === 'education'">
                            <h2 class="no-bottom-margin">W.P. Carey School of Business, Arizona State University</h2>
                            <span>Tempe, AZ</span>
                            <p>
                                Bachelor of Arts in Global Logistics Management
                            </p>
                            <h2 class="no-bottom-margin">Chandler-Gilbert Community College</h2>
                            <span>Chandler, AZ</span>
                            <p>
                                Associate in Business
                            </p>
                        </template>
                        <template v-else-if="section.key === 'school_and_community_experience'">
                            <h2 class="no-bottom-margin">Sun Devil Stock Exchange</h2>
                            <h3>Club Member</h3>
                            <p>Tempe, AZ, June 2022 - December 2023</p>
                            <ul>
                                <li>
                                    Furthered understanding of ownership of businesses and how financial data impacts
                                    businesses.
                                </li>
                                <li>
                                    Discovered how trading and investing through the stock market changes and how to
                                    invest through various methods.
                                </li>
                            </ul>
                            <h2 class="no-bottom-margin">CGCC Coding Club</h2>
                            <h3>Club Member</h3>
                            <p>Chandler, AZ, January 2022 - December 2022</p>
                            <ul>
                                <li>
                                    Worked with the club president to understand the applications of programming within
                                    a business environment.
                                </li>
                            </ul>
                        </template>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        const activePart = ref('professional_experience');

        function setActivePart(key: string) {
            activePart.value = key;
        }

        function beforeEnter(el: HTMLElement) {
            el.style.height = '0';
        }

        function enter(el: HTMLElement, done: () => void) {
            el.style.height = el.scrollHeight + 'px';
            const afterEnter = () => {
                el.style.height = 'auto';
                el.removeEventListener('transitionend', afterEnter);
                done();
            };
            el.addEventListener('transitionend', afterEnter);
        }

        function leave(el: HTMLElement, done: () => void) {
            el.style.height = el.scrollHeight + 'px';
            // Force repaint to make sure the transition starts
            void el.offsetHeight;
            el.style.height = '0';
            const afterLeave = () => {
                el.removeEventListener('transitionend', afterLeave);
                done();
            };
            el.addEventListener('transitionend', afterLeave);
        }

        const sections = [
            { key: 'professional_experience', title: 'Professional Experience' },
            { key: 'technical_skills', title: 'Technical Skills' },
            { key: 'academic_projects', title: 'Academic Projects' },
            { key: 'education', title: 'Education' },
            // { key: 'school_and_community_experience', title: 'School and Community Experience' },
        ];

        return {
            activePart,
            setActivePart,
            beforeEnter,
            enter,
            leave,
            sections,
        };
    },
});
</script>

<style scoped lang="less">
.container {
    margin-top: 10vh;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    position: relative;
}

ul {
    list-style-type: none;
    padding-left: 0;
}

ul li {
    padding-left: 18px;
    position: relative;
}

.no-bottom-margin {
    margin-bottom: 0;
    padding-bottom: 0;
}

li {
    font-size: 1.25em;
}

ul li::before {
    content: '-';
    position: absolute;
    left: 0;
    padding-right: 8px;
}

.resume-part {
    border-radius: 15px;
    background-color: #ffffff88;
    border: 2px solid #00000088;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 10px;
}

hr {
    color: #00000088;
}

.main-pane {
    width: 100%;
    margin: 0 auto;
    position: relative;

    h1 {
        text-align: center;
        cursor: pointer;
        user-select: none;
    }
}

.section-content {
    overflow: hidden;
    transition: height 0.3s ease;
}

@media screen and (max-width: 800px) {
    li {
        font-size: 1.05em;
    }
}
</style>
