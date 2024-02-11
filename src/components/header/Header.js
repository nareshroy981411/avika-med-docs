import React, { useState } from 'react';
import {
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import "./Header.scss";
import { Layout, Menu, Button, Dropdown } from 'antd';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;

const Home = ({ children }) => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const username = useSelector(
        (state) => state.authReducer?.loginData?.data?.user[0]?.username
    );
    const menuItems = [
        {
            label: "Home",
            key: "home",
            icon: <HomeOutlined />,
            path: "/home"
        },
        {
            label: "About",
            key: "about",
            icon: <UserOutlined />,
            path: "/about"
        },
    ];

    const handleLogout = () => {
        sessionStorage?.removeItem("token");
        navigate("/");
    };

    const headerMenuItems = (
        <Menu>
            <Menu.Item>
                {username}
            </Menu.Item>
            <Menu.Item onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );
    const handleMenuItemClick = (path) => {
        navigate(path);
    };

    return (
        <Layout className='layout-container'>
            <Header className='layout-header'>
                <figure className='avika-logo'>
                    <svg width="78" height="30" viewBox="0 0 78 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35.5006 15.942C35.4171 15.5206 35.3202 15.1276 35.2633 14.7289C35.212 14.3814 35.3639 14.0872 35.5993 13.8385C35.8253 13.6011 36.0626 13.3733 36.2885 13.136C36.541 12.8702 36.6682 12.5588 36.5657 12.1905C36.4537 11.7899 36.0588 11.6456 35.7094 11.8716C35.6221 11.9285 35.5424 12.0007 35.4645 12.0709C35.1361 12.3652 34.7716 12.5 34.3178 12.4241C33.6438 12.3082 33.1597 12.5626 32.8218 13.1683C32.7098 13.3695 32.5655 13.5271 32.2978 13.6011C32.4952 13.1607 32.5541 12.6974 32.8351 12.3177C33.1217 11.9285 33.5261 11.7387 33.9704 11.6058C34.183 11.5431 34.3995 11.4843 34.5988 11.3893C34.9918 11.2014 35.2215 10.8786 35.2728 10.442C35.3089 10.1458 35.0677 9.91038 34.7716 9.94835C34.6463 9.96544 34.5229 10.0072 34.4014 10.0433C33.8052 10.2236 33.2622 10.1097 32.7895 9.72053C32.4819 9.46802 32.1858 9.46992 31.8478 9.63509C31.5858 9.7623 31.3143 9.87051 31.0409 9.97493C30.9745 9.99961 30.891 9.97873 30.8036 9.97873C31.0903 9.69205 31.3561 9.40917 31.6428 9.14907C31.9617 8.86049 32.3585 8.8472 32.761 8.89656C33.0857 8.93643 33.4065 9.00478 33.7331 9.02376C34.1488 9.04844 34.521 8.90795 34.8304 8.62317C34.9766 8.49027 35.0905 8.3308 35.045 8.12765C34.9975 7.90552 34.8133 7.81249 34.6121 7.75934C34.5153 7.73465 34.4165 7.72136 34.3178 7.70238C33.9077 7.61695 33.6059 7.37393 33.3818 7.0303C33.2603 6.84424 33.1483 6.65249 33.0287 6.46643C32.8882 6.2481 32.6851 6.13988 32.425 6.15127C32.1649 6.16266 31.9029 6.18545 31.6428 6.19114C31.4415 6.19494 31.2479 6.16456 31.0998 6.01837C31.4396 5.89687 31.7681 5.76967 32.106 5.66335C32.6509 5.49058 33.135 5.65955 33.5869 5.96332C33.8679 6.15317 34.1432 6.35062 34.4336 6.52718C34.7716 6.73223 35.1399 6.77399 35.5272 6.68856C35.9544 6.59363 36.1119 6.15127 35.8272 5.81713C35.7873 5.77156 35.7436 5.726 35.6943 5.69182C35.2576 5.39565 35.0601 4.96279 34.9861 4.45777C34.9633 4.2983 34.9538 4.13692 34.9424 3.97554C34.9159 3.62621 34.7621 3.36801 34.4298 3.21803C34.1659 3.09842 33.9115 2.96362 33.6552 2.82883C33.4825 2.7377 33.3401 2.60859 33.2622 2.43203C33.5489 2.49089 33.8318 2.55544 34.1166 2.6048C34.2855 2.63517 34.4621 2.62948 34.6292 2.66365C35.2367 2.78896 35.5917 3.20474 35.831 3.74202C35.9411 3.99073 36.0265 4.24893 36.1385 4.49764C36.3151 4.88684 36.5809 5.17542 37.0289 5.24377C37.2928 5.28364 37.5263 5.22858 37.7029 5.01405C37.8776 4.80331 37.8472 4.58118 37.7599 4.34006C37.6744 4.10275 37.5871 3.85594 37.57 3.60913C37.5567 3.42307 37.6156 3.20664 37.7086 3.03956C38.1187 2.31242 38.0428 1.62515 37.5909 0.954966C37.4751 0.782199 37.3536 0.61133 37.234 0.440461L37.2776 0.391099C37.5264 0.567664 37.7902 0.725243 38.0238 0.922691C38.4035 1.24354 38.7167 1.62325 38.7813 2.13776C38.8041 2.32571 38.7908 2.53075 38.7414 2.71301C38.5762 3.32055 38.6996 3.85783 39.087 4.34006C39.2179 4.50334 39.3679 4.65522 39.5198 4.80331C39.6356 4.91722 39.7818 4.95709 39.9356 4.88684C40.0799 4.82039 40.1122 4.6894 40.1179 4.54131C40.1311 4.11983 40.3438 3.80088 40.6362 3.5123C40.8849 3.26739 41.1165 3.00349 41.3462 2.7377C41.5532 2.49848 41.6443 2.2099 41.6519 1.89285C41.6538 1.80172 41.6804 1.70489 41.7202 1.62325C41.8626 1.33847 41.8607 1.06128 41.7297 0.774605C41.612 0.518302 41.6329 0.271491 41.8455 0C41.8455 0.345534 42.0696 0.531591 42.21 0.763213C42.2879 0.892314 42.3297 1.06508 42.3297 1.21696C42.3278 1.51504 42.3524 1.80172 42.4436 2.0865C42.5423 2.39026 42.4663 2.68074 42.3012 2.94654C42.1493 3.19145 41.9784 3.42687 41.836 3.67747C41.6234 4.05338 41.5152 4.45588 41.5835 4.89444C41.6595 5.37857 42.0563 5.55133 42.4474 5.25706C42.5841 5.15454 42.7075 5.03113 42.8157 4.89823C43.091 4.5565 43.4365 4.33817 43.8751 4.30019C44.5832 4.23944 44.9933 3.85024 45.1794 3.18385C45.242 2.95983 45.3274 2.74149 45.4072 2.52316C45.4698 2.35229 45.6046 2.28394 45.747 2.26686C45.6768 2.55733 45.5913 2.84212 45.5401 3.13259C45.504 3.34523 45.5344 3.56736 45.4983 3.77999C45.392 4.40272 45.018 4.84318 44.4921 5.16213C44.2358 5.31781 43.9605 5.44312 43.7137 5.61019C43.4042 5.81903 43.1517 6.08862 43.0378 6.45314C42.9979 6.58034 42.979 6.73412 43.0112 6.85943C43.1024 7.21066 43.4631 7.31128 43.8409 7.09864C44.1143 6.94486 44.3858 6.80057 44.7066 6.77589C44.9914 6.75311 45.261 6.80817 45.5154 6.92967C46.0375 7.18028 46.5121 7.12902 46.9469 6.73222C47.1197 6.57465 47.3209 6.47402 47.5924 6.47402C47.5468 6.52528 47.5165 6.55756 47.4861 6.59173C47.2962 6.80817 47.0931 7.01701 46.9184 7.24483C46.5558 7.71757 46.0831 7.90552 45.5002 7.83907C45.1452 7.79921 44.794 7.78592 44.4389 7.86565C43.9396 7.97767 43.5124 8.40294 43.4308 8.88707C43.372 9.2364 43.5865 9.52118 43.9434 9.54207C44.1143 9.55156 44.2889 9.53637 44.456 9.5041C44.9174 9.41486 45.3009 9.54586 45.5781 9.91798C45.9065 10.3584 46.3242 10.5046 46.8501 10.3869C46.9241 10.3698 47.0058 10.3869 47.114 10.3907C46.7267 10.554 46.3868 10.7192 46.0318 10.8445C45.635 10.985 45.2572 10.8938 44.8965 10.6869C44.6573 10.5502 44.4124 10.4135 44.1542 10.3205C43.8846 10.2236 43.6036 10.2711 43.3378 10.3755C43.0093 10.5046 42.8973 10.8046 43.0511 11.1236C43.1631 11.3571 43.3378 11.5336 43.5599 11.6589C43.9358 11.8735 44.1617 12.1943 44.2567 12.6101C44.344 12.9993 44.5851 13.2271 44.9686 13.3183C45.1965 13.3733 45.4129 13.4512 45.5781 13.641C45.1794 13.6182 44.7902 13.6144 44.4029 13.5689C44.0156 13.5252 43.7099 13.3069 43.4669 13.0107C43.3169 12.8265 43.1897 12.6234 43.0473 12.4316C42.8005 12.0975 42.4853 11.8773 42.0525 11.9665C41.8854 12.0007 41.7202 12.1146 41.5854 12.2304C41.4411 12.3538 41.4544 12.5892 41.5778 12.7848C41.631 12.8683 41.6993 12.9443 41.762 13.0221C42.0392 13.36 42.1075 13.7283 41.9537 14.1422C41.7278 14.7498 41.7791 14.9168 42.267 15.3687C42.4056 15.4978 42.5195 15.6497 42.6467 15.7921C42.6334 15.8073 42.6182 15.8224 42.6049 15.8357C42.5689 15.8205 42.529 15.8073 42.4948 15.7864C42.2803 15.6687 42.0715 15.5415 41.8512 15.4351C41.3842 15.2073 41.1203 14.839 41.0349 14.3302C40.9836 14.0226 40.9304 13.717 40.8583 13.4151C40.8013 13.1778 40.6115 12.6044 39.2198 12.3424C39.0737 12.3082 38.9237 12.2968 38.7756 12.2703C37.4219 12.0367 36.4214 10.9793 36.205 9.6218C35.979 8.20929 36.8505 6.92777 38.151 6.48541C39.5236 6.02027 41.0121 6.65249 41.6101 7.95299C41.9974 8.79214 41.8133 9.77559 41.1526 10.4097C40.4539 11.0799 39.5122 11.247 38.711 10.8274C38.1491 10.5331 37.7599 10.0945 37.6763 9.44334C37.5605 8.54723 38.1396 7.79541 39.0338 7.6758C39.7894 7.57518 40.6532 8.18461 40.4615 9.1073C40.3666 9.56105 39.9356 9.90279 39.5103 9.83634C39.3015 9.80406 39.1325 9.70154 39.0281 9.51549C38.899 9.28956 39.0338 9.06553 39.292 9.07502C39.6983 9.09211 39.7666 8.91934 39.759 8.70861C39.7533 8.52255 39.5958 8.37256 39.3907 8.3327C38.8287 8.22448 38.2858 8.70861 38.3294 9.28007C38.3788 9.92177 38.9085 10.4211 39.5844 10.4572C40.5792 10.5122 41.2228 9.80027 41.1146 8.75417C41.05 8.12575 40.7311 7.66251 40.171 7.37013C39.6204 7.08346 39.0376 6.97144 38.4282 7.12712C37.4637 7.37203 37.0517 8.2017 37.0194 8.99529C36.9739 10.1002 37.7561 11.2773 38.7851 11.6229C39.8672 11.9855 40.8431 11.7615 41.6898 10.9888C42.3335 10.4021 42.7056 9.67876 42.698 8.80163C42.6904 7.88084 42.3278 7.10434 41.6196 6.5063C40.9152 5.91016 40.1027 5.57981 39.1724 5.60829C38.4433 5.62917 37.7808 5.87598 37.1808 6.28607C36.6929 6.62021 36.2714 7.01701 35.9809 7.5391C35.5291 8.34978 35.5633 9.18704 35.8518 10.0395C36.0835 10.723 36.4499 11.3248 36.9302 11.8602C37.0992 12.05 37.2738 12.2418 37.4143 12.4525C37.6649 12.8303 37.627 13.2044 37.2852 13.4986C37.0479 13.7037 36.7802 13.8878 36.4992 14.0226C35.9942 14.2656 35.7322 14.6321 35.7284 15.1978C35.7284 15.4484 35.7132 15.7123 35.512 15.9382L35.5006 15.942Z" fill="#FAA61A" />
                        <path d="M10.2445 28.5917V27.6804C9.13957 29.4746 7.29039 30.0005 5.38426 30.0005C2.32002 30.0005 0 28.3981 0 25.4724C0 22.5468 2.65036 20.7792 6.02027 20.7792C7.56568 20.7792 8.75417 21.028 10.1895 21.4703C10.1895 18.7649 8.83581 17.6315 6.43415 17.6315C5.35768 17.6315 4.28121 17.8802 3.28637 18.2105C2.43013 18.4858 1.54731 18.1555 1.35366 17.2157L1.18849 16.3879C1.85108 16.0291 3.94896 15.0627 6.68286 15.0627C11.1292 15.0627 13.062 17.4929 13.062 21.4418V29.7802H11.4596C10.6869 29.7802 10.2445 29.2828 10.2445 28.5936V28.5917ZM6.15886 27.7355C7.76123 27.7355 10.1895 26.7976 10.1895 24.2574V23.4562C8.94592 23.0138 8.00804 22.7936 6.59933 22.7936C4.16919 22.7936 2.87249 23.8701 2.87249 25.3338C2.87249 26.9913 4.5565 27.7355 6.15886 27.7355Z" fill="#4A8ECC" />
                        <path d="M21.1524 16.583L24.8526 24.7277L28.5244 16.5545C28.8832 15.7818 29.5743 15.3679 30.347 15.3679H32.4449L25.2931 29.7816H24.3552L17.2319 15.3679H19.3032C20.1044 15.3679 20.7936 15.8103 21.1524 16.583Z" fill="#4A8ECC" />
                        <path d="M37.8842 28.3444V15.3679H39.3195C40.1472 15.3679 40.7548 15.9755 40.7548 16.8032V29.7797H39.3195C38.4917 29.7797 37.8842 29.1722 37.8842 28.3444Z" fill="#4A8ECC" />
                        <path d="M50.8893 10.9497V21.8018L55.9983 16.1688C56.4406 15.6448 57.0747 15.3676 57.7373 15.3676H60.2491L53.87 22.4359L60.7731 29.7813H58.1778C57.5152 29.7813 56.9077 29.5326 56.4653 29.0086L50.8874 23.1004V28.346C50.8874 29.1738 50.2799 29.7813 49.4521 29.7813H47.9883V9.5144H49.4521C50.2799 9.5144 50.8874 10.1219 50.8874 10.9497H50.8893Z" fill="#4A8ECC" />
                        <path d="M74.5233 28.5917V27.6804C73.4184 29.4746 71.5692 30.0005 69.6631 30.0005C66.5988 30.0005 64.2788 28.3981 64.2788 25.4724C64.2788 22.5468 66.9292 20.7792 70.2991 20.7792C71.8445 20.7792 73.033 21.028 74.4683 21.4703C74.4683 18.7649 73.1146 17.6315 70.713 17.6315C69.6365 17.6315 68.56 17.8802 67.5652 18.2105C66.7089 18.4858 65.8261 18.1555 65.6325 17.2157L65.4673 16.3879C66.1299 16.0291 68.2278 15.0627 70.9617 15.0627C75.408 15.0627 77.3408 17.4929 77.3408 21.4418V29.7802H75.7384C74.9657 29.7802 74.5233 29.2828 74.5233 28.5936V28.5917ZM70.4377 27.7355C72.0381 27.7355 74.4683 26.7976 74.4683 24.2574V23.4562C73.2247 23.0138 72.2868 22.7936 70.8781 22.7936C68.448 22.7936 67.1513 23.8701 67.1513 25.3338C67.1513 26.9913 68.8353 27.7355 70.4377 27.7355Z" fill="#4A8ECC" />
                    </svg>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            marginLeft: "50px"
                        }}
                    />
                </figure>
                <div className='header-right' style={{ position:"relative", left:"85%" }}>
                    <Dropdown overlay={headerMenuItems}>
                        <Button icon={<UserOutlined />} />
                    </Dropdown>
                </div>
            </Header>
            <Layout>
                <Sider theme='light' trigger={null} collapsible collapsed={collapsed}>
                    <Menu defaultSelectedKeys={['1']} className='sider-menu'>
                        {menuItems.map(item => (
                            <Menu.Item key={item.key} className='sider-menu__items' onClick={() => handleMenuItemClick(item.path)}>
                                {collapsed ? item.icon : (
                                    <>
                                        {item.icon}
                                        {item.label}
                                    </>
                                )}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Content className='content-wrapper'>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
};
export default Home;