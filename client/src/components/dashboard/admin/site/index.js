import React from 'react';
import DashboardLayout from 'components/hoc/dashboardLayout';
import SiteVars from './siteVars'

const ManageSite = () => {
    return (
        <DashboardLayout title="Manage Site">
            <SiteVars />
        </DashboardLayout>
    );
}

export default ManageSite;