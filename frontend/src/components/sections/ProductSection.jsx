/* import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; */

import ProductGrid from '../product-grid/ProductGrid';
import Styles from './ProductSection.module.css';

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et{' '}
            </p>
          </div>

          {/* temp filter menu */}
          <div className="z-1 temp_menu overflow-x-scroll lg:overflow-x-visible max-w-full ">
            <ul className="flex p-4 lg:p-7">
              <li>Menu item 1</li>
              <li>Menu item 2</li>
              <li>Menu item 3</li>
              <li>Menu item 4</li>
            </ul>
          </div>

          <ProductGrid />

          {/*           <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}
        </div>
      </div>
    </section>
  );
}
