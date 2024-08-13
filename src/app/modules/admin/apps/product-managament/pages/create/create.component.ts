import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '@app/modules/admin/apps/product-managament/services/products.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Product } from '@app/core/models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CreateComponent implements OnInit {
  productForm!: FormGroup;
  serverErrors: any = {}; // Pour stocker les erreurs du serveur

  private readonly _productsService = inject(ProductsService);
  private _formBuilder = inject(FormBuilder)

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.maxLength(255)],
      price: ['', [Validators.required, Validators.min(1)]],
    })
  }

  addProduct(product: Product) {
    this._productsService.addProduct(product).subscribe({
        next: () => {
          this.serverErrors = {}; // Réinitialiser les erreurs du serveur
          this.productForm.reset(); // Réinitialiser le formulaire
        },
        error: (err) => {
          if (err.status === 422 && err.error.errors) {
            // Map server errors to form controls
            this.serverErrors = {};
            for (const key in err.error.errors) {
              if (Object.prototype.hasOwnProperty.call(err.error.errors, key)) {
                this.serverErrors[key] = err.error.errors[key];
              }
            }
          }
        }
      });
  }

  onSubmit() {
    if (this.productForm) {
          if (this.productForm.valid) {
            this.addProduct(this.productForm.value)
        } else {
          console.log('Form is invalid');
        }
      }
    }
}
