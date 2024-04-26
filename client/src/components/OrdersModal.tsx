// export const OrdersModal {
//     const { open, onClose, orders } = props;
//     return (
//         <Modal
//         open={open}
//         onClose={onClose}
//         title="Orders"
//         >
//         <ul className="order-list">
//             {orders.map((order) => (
//             <li key={order._id}>
//                 <div className="order-wrapper">
//                 <div className="order-info">
//                     <p>
//                     Order ID: {order._id}
//                     </p>
//                     <p>
//                     Total: {order.total} SEK
//                     </p>
//                     <p>
//                     {order.products.length} products
//                     </p>
//                 </div>
//                 <button>
//                     Show details
//                 </button>
//                 </div>
//             </li>
//             ))}
//         </ul>
//         </Modal>
//     );
// }
