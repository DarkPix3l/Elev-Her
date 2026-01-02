import ProductGrid from '../product-grid/ProductGrid'
import Styles from './ProductSection.module.css'

export default function ProductSection() {
  return (
    <section id="products" className={`gen-section ${Styles.product_section}`}>
      <div className="wrapper">
        <div className="flex flex-col items-center h-full gap-12">
          <div className={Styles.product_message}>
            <h2 className="text-[var(--accent-color)] text-shadow-md lg:text-[3rem] m-auto">
              Explore the latest models
            </h2>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et{' '}
            </p>
          </div>

          <ProductGrid />
        </div>
      </div>
    </section>
  )
}
