import React from 'react';
import DashboardLayout from 'components/hoc/dashboardLayout';
import HistoryBlock from 'utils/historyBlock';

const Dashboard = ({ users }) => {
    console.log(users);
    return (
        <DashboardLayout title="Overview">
            <div className='user_nfo_panel'>
                <div>
                    <span>{users.data.firstname}</span>
                    <span>{users.data.lastname}</span>
                    <span>{users.data.email}</span>
                </div>
            </div>
            <div className='user_nfo_panel'>
                <h2>History of purchases</h2>
                { users.data.history && users.data.history.length > 0 ? 
                
                    <div className='user_product_block_wrapper'>
                        <HistoryBlock 
                            history={users.data.history}
                        />
                    </div>
                    :
                    <div>No purchases yet</div>
                }
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;