import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductGrid from "../product-grid/ProductGrid";
import Styles from "./ExploreSection.module.css"

export default function ExploreSection() {
  return (
    <section className={`gen-section ${Styles.explore_section}`}>
      <div className=" stripe-inv"></div>
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center h-full ">
          <div className="explore-message text-center">
            <h2 className="text-[var(--accent-color)]">
              Explore the latest models
            </h2>
            <p className="max-w-[500px] ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et{" "}
            </p>
          </div>
          <div className="temp-menu">
            <ul className="flex gap-9 mt-7 border-b-amber-600 border-b-4 p-7">
              <li>hdfjhfg</li>
              <li>dkhgjhd</li>
              <li>dkhgjhd</li>
              <li>dkhgjhd</li>
              <li>dkhgjhd</li>
            </ul>
          </div>

          <ProductGrid/>

          <Pagination>
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
          </Pagination>
        </div>
      </div>
    </section>
  );
}
