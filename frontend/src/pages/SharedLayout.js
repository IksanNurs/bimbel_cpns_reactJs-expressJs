import { Outlet } from 'react-router-dom';
// const SharedLayout = () => {
//   return (
//     <Wrapper>
//       <main className='dashboard'>
//         <SmallSidebar />
//         <BigSidebar />
//         <div>
//           <Navbar />
//           <div className='dashboard-page'>
//             <Outlet />
//           </div>
//         </div>
//       </main>
//     </Wrapper>
//   );
// };
const SharedLayout = () => {
  return <Outlet/>
};
export default SharedLayout;
