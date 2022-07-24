import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from 'components/hoc/mainLayout';
import AuthGuard from 'components/hoc/authGuardNew';

import Loader from 'utils/loader';
import { useDispatch, useSelector } from 'react-redux';
import { userIsAuth, userSignOut } from 'store/actions/user.actions';

import Header from 'components/navigation/header';
import Footer from 'components/navigation/footer';
import Home from 'components/home/index';
import RegisterLogin from 'components/auth';
import Shop from 'components/shop';
import ProductDetail from 'components/product';

import Dashboard from 'components/dashboard';
import UserInfo from 'components/dashboard/user/info';
import AdminProducts from 'components/dashboard/admin/products';
import PreventSignIn from 'components/hoc/preventSignIn';
import AddProduct from 'components/dashboard/admin/products/addedit/add';
import EditProduct from 'components/dashboard/admin/products/addedit/edit';
import UserCart from 'components/dashboard/user/cart';
import ManageSite from 'components/dashboard/admin/site';

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(userSignOut());
  };

  useEffect(() => {
    dispatch(userIsAuth());
  }, [dispatch]);

  useEffect(() => {
    if(users.auth !== null) {
      setLoading(false);
    }
  }, [users]);

  return (
      <BrowserRouter>
        { loading ?
          <Loader full={true} />
          :
          <>
              <Header users={users} signOutUser={signOutUser} />
                <MainLayout>
                  <Routes>
                    <Route path='/dashboard' element={
                      <AuthGuard>
                        <Dashboard users={users} />
                      </AuthGuard>} 
                    />
                    <Route path='/dashboard/admin/admin_products' element={
                      <AuthGuard>
                        <AdminProducts users={users} />
                      </AuthGuard>} 
                    />
                    <Route path='/dashboard/admin/add_product' element={
                      <AuthGuard>
                        <AddProduct users={users} />
                      </AuthGuard>} 
                    />
                    <Route path='/dashboard/admin/edit_product/:id' element={
                      <AuthGuard>
                        <EditProduct users={users} />
                      </AuthGuard>} 
                    />
                    <Route path='/dashboard/user/user_info' element={
                      <AuthGuard>
                        <UserInfo users={users} />
                      </AuthGuard>} 
                    />
                    <Route path='/dashboard/user/user_cart' element={
                      <AuthGuard>
                        <UserCart users={users} />
                      </AuthGuard>} 
                    />
                    <Route path='/dashboard/admin/manage_site' element={
                      <AuthGuard>
                        <ManageSite users={users} />
                      </AuthGuard>} 
                    />
                    <Route path='/signin' element={
                      <PreventSignIn>
                        <RegisterLogin />
                      </PreventSignIn>} />
                    <Route path='/' element={<Home />} />
                    <Route path='/shop' element={<Shop />}></Route>
                    <Route path='/product_detail/:id' element={<ProductDetail />}></Route>
                  </Routes>
                </MainLayout>
              <Footer />
          </>
        }
      </BrowserRouter>
      
  );
}

export default AppRoutes;
