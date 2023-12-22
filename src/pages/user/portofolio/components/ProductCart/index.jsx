// 'use client'

// import clsx from "clsx"
// import { Notyf } from 'notyf'
// import { useState } from "react"

// import style from "./style.module.scss"

// import Button from "../../../../../components/primitives/Button"
// import Card from "../../../../../components/primitives/Card"
// import { cartStore } from "../../../../../lib/zustand/stores/cartStore"
// import { IProduct } from "../../../../../types/product"
// import { IVariant, IVariantValue } from "../../../../../types/product"

// export default function CategoryItem({ product }) {
//   let notiyf;
//   if (typeof window !== "undefined") {
//     notiyf = new Notyf({
//       position: {
//         x: 'center',
//         y: 'top',
//       },
//     })
//   }
//   const [form, setForm] = useState<{
//     qty: number | undefined;
//     [key: IVariant["id"]]: any;
//   }>({ qty: undefined });

//   const { addToCart: updateCart } = cartStore();

//   function onClickAttribute(variant: IVariant, attribute: IVariantValue) {
//     setForm((prev) => {

//       delete prev[variant.id];

//       const newValue = {
//         ...prev,
//         [variant.id]: {
//           ...variant,
//           values: attribute,
//         },
//       };

//       return newValue;
//     });
//   }

//   function renderAttributes(variant: IVariant) {
//     const attributesComp = [] as JSX.Element[];

//     variant.values.forEach((attribute: IVariantValue) => {
//       attributesComp.push(
//         <Button
//           className={clsx([
//             "mr-2",
//             form?.[variant.id] &&
//               attribute.label === form?.[variant.id]?.values?.label &&
//               style["attribute-active"],
//           ])}
//           variant="secondary"
//           onClick={() => onClickAttribute(variant, attribute)}
//         >
//           {attribute.label}
//         </Button>
//       );
//     });

//     return attributesComp;
//   }

//   function checkAttributes() {
//     const attributes = [];
//     const variants = [];
//     let variantKey = ''
//     for (const key in form) {
//       if (key !== "qty") {
//         attributes.push(key);
//         variants.push(form[key]);
//         variantKey += `${key} `;
//       }
//     }

//     return { isValid: attributes.length === (product?.variants || []).length, variants, variantKey: variantKey.trim() };
//   }

//   function addToCart() {
//     const { isValid: isValidAttributes, variants, variantKey } = checkAttributes();

//     if(!isValidAttributes && (product?.variants || []).length > 1) {
//       notiyf.error('Mohon pilih varian produk');
//       return;
//     }

//     if((form.qty || 0) < 1) {
//       notiyf.error('Jumlah produk tidak boleh kosong');
//       return;
//     }

//     if ((product?.variants || []).length > 1) {
//       updateCart({
//         cartKey: `${product.id}-${variantKey.replace(' ', '-')}`,
//         ...product,
//         variants,
//         qtyCart: form.qty
//       });

//     } else {
//       updateCart({
//         ...product,
//         qtyCart: form.qty
//       });
//     }

//     notiyf.success('Berhasil ditambahkan ke keranjang');

//   }

//   function addQty() {
//     let currentQty: any = form.qty || 0;
//     currentQty++;
//     setForm({
//       ...form,
//       qty: currentQty.toString(),
//     });
//   }

//   function subtractQty() {
//     let currentQty: any = form.qty || 0;
//     currentQty--;
//     setForm({
//       ...form,
//       qty: currentQty.toString(),
//     });
//   }

//   function onChangeQty({ target: { value: newQty } }: any) {
//     if (newQty >= 1) {
//       setForm({
//         ...form,
//         qty: newQty,
//       });
//     }
//   }

//   return (
//     <Card className={clsx(["p-3 d-flex flex-col", style["product-cart"]])}>
//       {(product?.variants || []).length > 1 && (
//         <>
//           <span className={clsx(["text-lg pb-4", style["variant-label"]])}>
//             Pilih Varian
//           </span>
//           {product?.variants?.length > 1 ? (
//             product?.variants.map((variant) => (
//               <div className="d-flex flex-col mb-5" key={variant.id}>
//                 <span
//                   className={clsx(["text-sm mb-2", style["attribute-label"]])}
//                 >
//                   <strong>{variant.label}:</strong>{" "}
//                   <span className={style["attributes-label"]}>
//                     {variant.values.length} Varian
//                   </span>
//                 </span>
//                 <div className="d-flex" style={{ height: "30px" }}>
//                   {renderAttributes(variant)}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <></>
//           )}
//         </>
//       )}

//       <span className={clsx(["text-lg pb-4", style["variant-label"]])}>
//         Jumlah
//       </span>

//       {/* variants comp */}
//       <div className="d-flex flex-col">
//         {/* quantity comp */}
//         <div className={style["qty-input-wrapper"]}>
//           <Button
//             variant="secondary"
//             className={clsx([
//               style["btn-subtract-qty"],
//               (form.qty || 0) <= 1 && style["disabled-qty-input-subtract"],
//             ])}
//             onClick={() => subtractQty()}
//             disabled={(form.qty || 0) <= 1}
//           >
//             -
//           </Button>
//           <input
//             min={1}
//             value={form.qty}
//             type="number"
//             className={style["qty-input"]}
//             onChange={(value) => onChangeQty(value)}
//           />
//           <Button
//             variant="secondary"
//             className={style["btn-add-qty"]}
//             onClick={() => addQty()}
//           >
//             +
//           </Button>
//         </div>

//         <Button onClick={() => addToCart()} className="mt-4">
//           + Keranjang
//         </Button>
//       </div>
//     </Card>
//   );
// }
