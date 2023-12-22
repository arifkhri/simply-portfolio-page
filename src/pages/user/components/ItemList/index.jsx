// import clsx from 'clsx'
// import Link from 'next/link'

// import style from './style.module.scss'

// import Card from '../../../../components/primitives/Card'
// import { toIdrFormat } from '../../../../core/utils'
// import { IProduct } from '../../../../types/product'

// export default function ItemList({id, price, thumbnail, name }: Pick<IProduct, 'price' | 'name' | 'thumbnail' | 'id'>) {

//   return (
//     <Link href={`/products/${id}`} className="link">
//     <Card className="pointer zoom" variant="transparent">
//       <div className={clsx(['d-flex flex-col items-center relative', style['item-content']])}>
//         <img src={thumbnail} width="300px" />
//         <span className={clsx(['mt-2', style['title']])}>{name}</span>
//         <span className={clsx(['mt-2 absolute', style['price']])}>{toIdrFormat(price)}</span>
//       </div>
//     </Card>
//     </Link>
//   );
// }
