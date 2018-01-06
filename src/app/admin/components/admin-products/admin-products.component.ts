import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from "../../../shared/services/product.service";
import { Subscription } from "rxjs/Subscription";
import { Product } from "../../../shared/models/product";
import { DataTableResource } from "angular-4-data-table";

@Component({
    selector: "app-admin-products",
    templateUrl: "./admin-products.component.html",
    styleUrls: [ "./admin-products.component.css" ]
})
export class AdminProductsComponent implements OnInit, OnDestroy {

    products: Product[] = [];
    filteredProducts: Product[] = [];
    subscription: Subscription;
    tableResource: DataTableResource<Product>;
    itemCount = 0;

    constructor(private productService: ProductService) {
        this.subscription = this.productService.getAll().subscribe(products => {
            products.forEach(p => {
                let prod: Product;
                prod = p.payload.val();
                prod.id = p.key;
                this.products.push(prod);
            });

            this.initializeTable(this.products);
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private initializeTable(products: Product[]) {
        this.tableResource = new DataTableResource(products);
        this.tableResource.query({offset: 0})
            .then(items => this.filteredProducts = items);
        this.tableResource.count()
            .then(count => this.itemCount = count);
    }

    reloadItems(params) {
        if (!this.tableResource) {
            return;
        }
        this.tableResource.query(params)
            .then(items => this.filteredProducts = items);
    }

    filter(query: string) {
        let filteredProducts = (query) ?
            this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
            this.products;
        this.initializeTable(filteredProducts);
    }

}
