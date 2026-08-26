import Link from 'next/link';
import Footer from '../components/Footer';
import './pages.css';
import Image from 'next/image';

import syedwaseemAkhtar from '../assets/team-photos/leadership/syed-waseem-akhtar.png';
import furqanqamar from '../assets/team-photos/leadership/furqan-qamar.png';
import monowarAlamKhalid from '../assets/team-photos/leadership/monowar-alam-khalid.png';
import shishAhmad from '../assets/team-photos/leadership/shish-ahmad.png';
import anumKamal from '../assets/team-photos/leadership/anum-kamal.png';
import syedNadeemAkhtar from '../assets/team-photos/leadership/syed-nadeem-akhtar.png';

import maazsiddiqui from '../assets/team-photos/organizers/Maaz-Siddiqui.jpg';
import reemhamraz from '../assets/team-photos/organizers/Reem-Hamraz.png';

import aliyahmohammadazam from '../assets/team-photos/core-committee/Aliyah_Mohammad_Azam.jpg';
import arifsheikh from '../assets/team-photos/core-committee/Arif_Sheikh.jpeg';
import haidermaseeh from '../assets/team-photos/core-committee/Haider-Maseeh.jpg';
import jamizqamar from '../assets/team-photos/core-committee/Jamiz-Qamar.jpg';

export default function TeamPage() {
    return (
        <div className="page-root">
            <div className="page-hero">
                <div className="page-hero-label">People</div>
                <h1>Our <span className="accent">Team</span></h1>
                <p className="page-hero-sub">
                    Meet the students who are working together to bring the inaugural TEDxIntegralUniversity
                    to life through our theme, <strong>TESSELLATION</strong>.
                </p>
            </div>
            <section className="team-stats">
                <div className="stat-card">
                    <h2>79</h2>
                    <p>Team Members</p>
                </div>

                <div className="stat-card">
                    <h2>9</h2>
                    <p>Departments</p>
                </div>

                <div className="stat-card">
                    <h2>2</h2>
                    <p>Organizing Coordinators</p>
                </div>

                <div className="stat-card">
                    <h2>4</h2>
                    <p>Core Committee</p>
                </div>
            </section>
            <section className="team-section leadership-section">
                <div className="section-divider"></div>

                <div className="team-section-header">
                    <h2 className="section-title">
                        Leadership <span className="accent">Team</span>
                    </h2>

                    <p className="section-subtitle">
                        The leadership and academic guidance behind TEDxIntegralUniversity.
                    </p>
                </div>
                <div className="team-grid">

                    <div className="team-card">
                        <Image
                            unoptimized
                            width={1200}
                            height={900}
                            src={syedwaseemAkhtar}
                            alt="Prof. Syed Mohammad waseem Akhtar"
                            className="team-image"
                        />

                        <div className="team-overlay">
                            <h3>Prof. Syed Waseem Akhtar</h3>

                            <p className="team-role">
                                Chief Patron
                            </p>

                            <span className="team-badge">
                                Chancellor, Integral University
                            </span>

                            <div className="team-divider"></div>

                            <p className="team-event">
                                TEDxIntegralUniversity
                            </p>
                        </div>
                    </div>
                    <div className="team-card">
                        <Image
                            src={syedNadeemAkhtar}
                            alt="Prof. Dr. Syed  Mohammad Nadeem Akhtar"
                            className="team-image"
                            width={1200}
                            height={900}
                        />

                        <div className="team-overlay">
                            <h3>Dr. Syed Nadeem Akhtar</h3>

                            <p className="team-role">
                                Chief Patron
                            </p>

                            <span className="team-badge">
                                Pro-Chancellor, Integral University
                            </span>

                            <div className="team-divider"></div>

                            <p className="team-event">
                                TEDxIntegralUniversity
                            </p>
                        </div>
                    </div>


                    <div className="team-card">
                        <Image
                            unoptimized
                            width={1200}
                            height={900}
                            src={furqanqamar}
                            alt="Dr. Furqan qamar"
                            className="team-image"
                        />

                        <div className="team-overlay">
                            <h3>Prof. Furqan Qamar</h3>

                            <p className="team-role">
                                Patron
                            </p>
                            <span className="team-badge">
                                Vice-Chancellor, Integral University
                            </span>
                            <div className="team-divider"></div>

                            <p className="team-event">
                                TEDxIntegralUniversity
                            </p>
                        </div>
                    </div>
                    <div className="team-card">
                        <Image
                            src={monowarAlamKhalid}
                            alt="Prof. Dr. Monowar Alam Khalid"
                            className="team-image"
                            width={1200}
                            height={900}
                        />

                        <div className="team-overlay">
                            <h3>Dr. Monowar Alam Khalid</h3>

                            <p className="team-role">
                                Co-Patron
                            </p>

                            <span className="team-badge">
                                Dean of Students' Welfare, Integral University
                            </span>

                            <div className="team-divider"></div>

                            <p className="team-event">
                                TEDxIntegralUniversity
                            </p>
                        </div>
                    </div>
                    <div className="team-card">
                        <Image
                            src={shishAhmad}
                            alt="Dr. Shish Ahmad"
                            className="team-image"
                            width={1200}
                            height={900}
                        />

                        <div className="team-overlay">
                            <h3>Dr. Shish Ahmad</h3>

                            <p className="team-role">
                                Mentor
                            </p>

                            <span className="team-badge">
                                Head Of CSE Dept., Integral University
                            </span>

                            <div className="team-divider"></div>

                            <p className="team-event">
                                TEDxIntegralUniversity
                            </p>
                        </div>
                    </div>
                    <div className="team-card">
                        <Image
                            src={anumKamal}
                            alt="Dr. Anum Kamal"
                            className="team-image"
                            width={1200}
                            height={900}
                        />

                        <div className="team-overlay">
                            <h3>Dr. Anum Kamal</h3>

                            <p className="team-role">
                                Faculty Advisor
                            </p>

                            <span className="team-badge">
                                Assistant Professor, CSE, Integral University
                            </span>

                            <div className="team-divider"></div>

                            <p className="team-event">
                                TEDxIntegralUniversity
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <section className="team-section">
                <div className="section-divider"></div>

                <div className="team-section-header">
                    <h2 className="section-title">
                        Organizing <span className="accent">Coordinators</span>
                    </h2>
                    <p className="section-subtitle">
                        The visionaries shaping the inaugural
                        TEDxIntegralUniversity experience through leadership,
                        innovation, and collaboration.
                    </p>
                </div>

                <div className="team-grid">
                    <div className="team-card">

                        <Image unoptimized width={1200} height={900}
                            src={reemhamraz}
                            alt="Reem Hamraz"
                            className="team-image"
                        />

                        <div className="team-overlay">

                            <h3>Reem Hamraz</h3>

                            <p className="team-role">
                                Lead Organizer
                            </p>

                            <div className="team-divider"></div>

                            <p className="team-event">
                                TEDxIntegralUniversity
                            </p>

                        </div>

                    </div>
                    <div className="team-card">

                        <Image unoptimized width={1200} height={900}
                            src={maazsiddiqui}
                            alt="Mohamad Maaz Siddiqui"
                            className="team-image"
                        />

                        <div className="team-overlay">

                            <h3>Mohammad Maaz Siddiqui</h3>

                            <p className="team-role">
                                Co-Organizer
                            </p>

                            <div className="team-divider"></div>

                            <p className="team-event">
                                TEDxIntegralUniversity
                            </p>

                        </div>

                    </div>
                </div>


            </section>
            <section className="team-section">

                <div className="section-divider"></div>

                <div className="team-section-header">

                    <h2 className="section-title">
                        Core <span className="accent">Committee</span>
                    </h2>

                    <p className="section-subtitle">
                        The strategic minds driving creativity, operations, logistics,
                        and execution behind TEDxIntegralUniversity.
                    </p>

                </div>

                <div className="team-grid">
                    <div className="team-card">

                        <Image unoptimized width={1200} height={900}
                            src={aliyahmohammadazam}
                            alt="Aliyah Mohammad Azam"
                            className="team-image"
                        />

                        <div className="team-overlay">

                            <h3>Aliyah Mohammad Azam</h3>

                            <p className="team-role">
                                Creative Specialist
                            </p>

                            <div className="team-divider"></div>

                            <p className="team-event">
                                TEDxIntegralUniversity
                            </p>

                        </div>
                    </div>
                    <div className="team-card">

                        <Image unoptimized width={1200} height={900}
                            src={arifsheikh}
                            alt="Arif Sheikh"
                            className="team-image"
                        />

                        <div className="team-overlay">

                            <h3>Arif Sheikh</h3>

                            <p className="team-role">
                                Media Executive
                            </p>

                            <div className="team-divider"></div>

                            <p className="team-event">
                                TEDxIntegralUniversity
                            </p>

                        </div>
                    </div>

                    <div className="team-card">

                        <Image unoptimized width={1200} height={900}
                            src={haidermaseeh}
                            alt="Haider Maseeh"
                            className="team-image"
                        />

                        <div className="team-overlay">

                            <h3>Haider Maseeh</h3>

                            <p className="team-role">
                                Field Supervisor
                            </p>

                            <div className="team-divider"></div>

                            <p className="team-event">
                                TEDxIntegralUniversity
                            </p>

                        </div>
                    </div>

                    <div className="team-card">

                        <Image unoptimized width={1200} height={900}
                            src={jamizqamar}
                            alt="Jamiz Qamar"
                            className="team-image"
                        />

                        <div className="team-overlay">

                            <h3>Jamiz Qamar</h3>

                            <p className="team-role">
                                Treasurer
                            </p>

                            <div className="team-divider"></div>

                            <p className="team-event">
                                TEDxIntegralUniversity
                            </p>

                        </div>
                    </div>
                </div>

            </section>
            <section className="team-section">

                <div className="section-divider"></div>

                <div className="team-section-header">

                    <h2 className="section-title">
                        Team <span className="accent">Leads</span>
                    </h2>

                    <p className="section-subtitle">
                        Meet the passionate committee leads responsible for planning,
                        collaboration and execution across every department of
                        TEDxIntegralUniversity.
                    </p>

                </div>

                <div className="committee-grid">
                    <div className="committee-card">

                        <div className="committee-header">

                            <h3>Content Committee</h3>

                            <span className="committee-count">
                                3 Leads
                            </span>

                        </div>
                        <div className="committee-member">

                            <div className="member-dot"></div>
                            <div className="member-info">
                                <h4>Imama Bint Anwar</h4>
                                <p>Curation</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Neda Fatima</h4>
                                <p>Content</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Faria Ahmad Quraishi</h4>
                                <p>Blogs</p>
                            </div>

                        </div>

                    </div>

                    <div className="committee-card">

                        <div className="committee-header">

                            <h3>Decor Committee</h3>

                            <span className="committee-count">
                                3 Leads
                            </span>

                        </div>
                        <div className="committee-member">

                            <div className="member-dot"></div>
                            <div className="member-info">
                                <h4>Gulafshan Bano</h4>
                                <p>Props</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Umra Khanam</h4>
                                <p>Venue</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Fazaz Ali Khan</h4>
                                <p>Decor</p>
                            </div>

                        </div>


                    </div>

                    <div className="committee-card">

                        <div className="committee-header">

                            <h3>Graphics Committee</h3>

                            <span className="committee-count">
                                2 Leads
                            </span>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>
                            <div className="member-info">
                                <h4>Arman Ahmad</h4>
                                <p>Visual</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Areeb Usmani</h4>
                                <p>Technical</p>
                            </div>

                        </div>
                    </div>

                    <div className="committee-card">

                        <div className="committee-header">

                            <h3>Logistics Committee</h3>

                            <span className="committee-count">
                                4 Leads
                            </span>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>
                            <div className="member-info">
                                <h4>Jamiz Qamar</h4>
                                <p>Inventory</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>
                            <div className="member-info">
                                <h4>Mohd Arsh Nafis</h4>
                                <p>Inventory</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Iqra Khan</h4>
                                <p>Audit Coordination</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Fiza Rizvi</h4>
                                <p>Documentation</p>
                            </div>

                        </div>

                    </div>

                    {/*
                    <div className="committee-card">

                        <div className="committee-header">

                            <h3>Media Committee</h3>

                            <span className="committee-count">
                                2 Leads
                            </span>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>
                            <div className="member-info">
                                <h4>Not assigned</h4>
                                <p>Curation Lead</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Not assigned</h4>
                                <p>Content Lead</p>
                            </div>

                        </div>
                    </div>
                    */}

                    <div className="committee-card">

                        <div className="committee-header">

                            <h3>Outreach Committee</h3>

                            <span className="committee-count">
                                3 Leads
                            </span>

                        </div>


                        <div className="committee-member">

                            <div className="member-dot"></div>
                            <div className="member-info">
                                <h4>Mansi Srivastava</h4>
                                <p>Performers</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Ana Ajlal Farooqui</h4>
                                <p>Formal Outreach</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Rohan Khan</h4>
                                <p>Speakers</p>
                            </div>

                        </div>

                    </div>

                    <div className="committee-card">

                        <div className="committee-header">

                            <h3>Social Media & Marketing Committee</h3>

                            <span className="committee-count">
                                3 Leads
                            </span>

                        </div>


                        <div className="committee-member">

                            <div className="member-dot"></div>
                            <div className="member-info">
                                <h4>Naqi Hasan</h4>
                                <p>Social Media</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Zaina Khan</h4>
                                <p>Social Media</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Abdullah Khan</h4>
                                <p>Marketing</p>
                            </div>

                        </div>

                    </div>

                    <div className="committee-card">

                        <div className="committee-header">

                            <h3>Sponsorship Committee</h3>

                            <span className="committee-count">
                                2 Leads
                            </span>

                        </div>


                        <div className="committee-member">

                            <div className="member-dot"></div>
                            <div className="member-info">
                                <h4>Zuriel Shatab</h4>
                                <p>Networking</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Hanzala Siddique</h4>
                                <p>Communications</p>
                            </div>

                        </div>
                    </div>

                    <div className="committee-card">

                        <div className="committee-header">

                            <h3>Volunteers Committee</h3>

                            <span className="committee-count">
                                2 Leads
                            </span>

                        </div>


                        <div className="committee-member">

                            <div className="member-dot"></div>
                            <div className="member-info">
                                <h4>Umam Khanam</h4>
                                <p>Management</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Devansh Srivastava</h4>
                                <p>Supervision</p>
                            </div>

                        </div>

                    </div>

                    <div className="committee-card">

                        <div className="committee-header">

                            <h3>Web Development Committee</h3>

                            <span className="committee-count">
                                2 Leads
                            </span>

                        </div>


                        <div className="committee-member">

                            <div className="member-dot"></div>
                            <div className="member-info">
                                <h4>Mohammad Ashjaa Khan</h4>
                                <p>Quality Assurance</p>
                            </div>

                        </div>

                        <div className="committee-member">

                            <div className="member-dot"></div>

                            <div className="member-info">
                                <h4>Arsalaan Ul Hasan</h4>
                                <p>Code Review</p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </div>
    );
}
