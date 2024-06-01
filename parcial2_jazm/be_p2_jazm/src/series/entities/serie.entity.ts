import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('series')
export class Serie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 250, nullable: false })
  titulo: string;

  @Column('varchar', { length: 5000, nullable: false })
  sinopsis: string;

  @Column('varchar', { length: 100, nullable: false })
  director: string;

  @Column('int')
  temporadas: number;

  @Column('date')
  fechaEstreno: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;
}
