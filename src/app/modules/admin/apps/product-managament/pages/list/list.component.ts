import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from '@app/core/models/product';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ProductsService } from '@app/modules/admin/apps/product-managament/services/products.service';
import { AsyncPipe } from '@angular/common';
import { CurrencyAriaryPipe } from 'src/utils/helpers/currency.ariary.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, CurrencyAriaryPipe, MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  //products$: Observable<ReturnTypes<PaginationData<Product>> | null> | undefined;
  loading: boolean = false;

  searchControl: FormControl = new FormControl();
  results: string[] = [];

  displayedColumns: string[] = ['name', 'price'];
  dataSource = new MatTableDataSource<Product>();

  length: number | undefined;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('searchInput') searchInput: ElementRef | undefined;

  private readonly _productsService = inject(ProductsService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.loading = true;

    this.loadProducts(this.pageIndex, this.pageSize);

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this._unsubscribeAll)
    ).subscribe(value => {
      if (value) {
        this.searchProducts(value);
      } else {
        this.loadProducts(this.pageIndex, this.pageSize);
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }


  loadProducts(pageIndex: number, pageSize: number): void {
    this._productsService.getProduct(pageIndex + 1, pageSize)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (res) => {
          this.dataSource.data = res.data.data;
          this.length = res.data.total
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  searchProducts(key: string) {
    this._productsService.searchProduct(key)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (res) => {
          console.log(res)
          this.dataSource.data = res.data.data;
          this.length = res.data.total
          this.loading = false;
          setTimeout(() => {
            this.focusSearchInput();
          }, 100);
        },
        error: () => {
          this.loading = false;
        }
      })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadProducts(this.pageIndex, this.pageSize)
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private focusSearchInput() {
    if (this.searchInput) {
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      }, 0);
    }
  }

}
