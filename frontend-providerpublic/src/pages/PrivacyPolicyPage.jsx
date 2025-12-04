import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div className="public-container">
            <header className="public-header">
                <h1>Privacy Policy</h1>
                <p>Last Updated: December 2025</p>
            </header>

            <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <section style={{ marginBottom: '20px' }}>
                    <h3>1. Introduction</h3>
                    <p>
                        Welcome to TechTitans Wellness Portal. We are committed to protecting your personal information and your right to privacy.
                    </p>
                </section>

                <section style={{ marginBottom: '20px' }}>
                    <h3>2. Information We Collect</h3>
                    <p>
                        We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.
                    </p>
                </section>

                <section style={{ marginBottom: '20px' }}>
                    <h3>3. How We Use Your Information</h3>
                    <p>
                        We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                    </p>
                </section>

                <section>
                    <h3>4. Contact Us</h3>
                    <p>
                        If you have questions or comments about this policy, you may email us at privacy@techtitans.com.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
