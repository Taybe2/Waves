import React from 'react';

import ContactsIcon from '@mui/icons-material/Contacts';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useSelector } from 'react-redux';

const Footer = () => {
    const site = useSelector(state => state.site);

    return (
        <footer className='bck_b_dark'>
            <div className='container'>
                <div className='logo'>
                    Waves
                </div>
                { site && site.vars ? 
                        <div className='wrapper'>
                            <div className='left'>
                                <h2>Contact Information</h2>
                                <div className='bussiness_nfo'>
                                    <div className='tag'>
                                        <ContactsIcon />
                                        <div className='nfo'>
                                            <div>Address</div>
                                            <div>{site.vars.address}</div>
                                        </div>
                                    </div>
                                    <div className='tag'>
                                        <PhoneIcon />
                                        <div className='nfo'>
                                            <div>Phone</div>
                                            <div>{site.vars.phone}</div>
                                        </div>
                                    </div>
                                    <div className='tag'>
                                        <TimelapseIcon />
                                        <div className='nfo'>
                                            <div>Working Hours</div>
                                            <div>{site.vars.hours}</div>
                                        </div>
                                    </div>
                                    <div className='tag'>
                                        <EmailIcon />
                                        <div className='nfo'>
                                            <div>Email</div>
                                            <div>{site.vars.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='right'>
                                <h2>Be the first toknow</h2>
                                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lorem dolor, posuere in elementum quis, tempus at nulla. Vivamus facilisis sapien ac est ullamcorper aliquam.</div>
                            </div>
                        </div>
                    :
                        null
                }
            </div>
        </footer>
    );
};

export default Footer;