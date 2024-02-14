// import React, { useState } from "react";

// const Modal = (props: any) => {
//   const { open, close, header } = props;

//   return (
//     <div className={open ? "openModal pop" : "pop"}>
//       {open ? (
//         <section>
//           <header>
//             {header}
//             <button className="close" onClick={close}>
//               <span
//                 className="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeInherit css-fnit94-MuiIcon-root"
//                 aria-hidden="true"
//               >
//                 close
//               </span>
//             </button>
//           </header>
//           <main className="deptAddTbl">
//             <table className="addTbl">
//               <thead>
//                 <th>부문</th>
//                 <th>본부</th>
//                 <th>팀</th>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="td">
//                     <select>
//                       <option value={1}>하이하이</option>
//                       <option value={2}>하하</option>
//                       <option value={3}>히힣</option>
//                     </select>
//                   </td>
//                   <td className="td">
//                     <select>
//                       <option value={1}>하이하이</option>
//                       <option value={2}>하하</option>
//                       <option value={3}>히힣</option>
//                     </select>
//                   </td>
//                   <td className="td">
//                     <select>
//                       <option value={1}>하이하이</option>
//                       <option value={2}>하하</option>
//                       <option value={3}>히힣</option>
//                     </select>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             <button className="addbtn" onClick={close}>
//               저장
//             </button>
//           </main>
//         </section>
//       ) : null}
//     </div>
//   );
// };

// export default Modal;
