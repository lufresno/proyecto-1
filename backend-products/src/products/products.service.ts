import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  // Leer todos
  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  // Leer uno solo
  async findOne(id: number) {
    const product = await this.repo.findOneBy({ id });
    if (!product) throw new NotFoundException(`Producto con ID ${id} no existe`);
    return product;
  }

  // Crear
  create(data: Partial<Product>) {
    const newProduct = this.repo.create(data);
    return this.repo.save(newProduct);
  }

  // Actualizar
  async update(id: number, data: Partial<Product>) {
    const product = await this.findOne(id);
    const updated = Object.assign(product, data);
    return this.repo.save(updated);
  }

  // Borrar
  async remove(id: number) {
    const product = await this.findOne(id);
    return this.repo.remove(product);
  }
}