import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from './entities/serie.entity';

@Injectable()
export class SeriesService {
  constructor(@InjectRepository(Serie) private SeriesRepository: Repository<Serie>) {}

  async create(createSerieDto: CreateSeriesDto): Promise<Serie> {
    const existe = await this.SeriesRepository.findOneBy({
      titulo: createSerieDto.titulo.trim(),
      director: createSerieDto.director.trim(),
    });

    if (existe) {
      throw new ConflictException('La serie ya existe');
    }

    return this.SeriesRepository.save({
      titulo: createSerieDto.titulo.trim(),
      sinopsis: createSerieDto.sinopsis.trim(),
      director: createSerieDto.director.trim(),
      temporadas: createSerieDto.temporadas,
      fechaEstreno: createSerieDto.fechaEstreno,
    });
  }

  async findAll(): Promise<Serie[]> {
    return this.SeriesRepository.find();
  }

  async findOne(id: number): Promise<Serie> {
    const serie = await this.SeriesRepository.findOneBy({ id });
    if (!serie) {
      throw new NotFoundException(`La serie ${id} no existe`);
    }
    return serie;
  }

  async update(id: number, updateSerieDto: UpdateSeriesDto): Promise<Serie> {
    const serie = await this.findOne(id);
    const serieUpdate = Object.assign(serie, updateSerieDto);
    return this.SeriesRepository.save(serieUpdate);
  }

  async remove(id: number) {
    const serie = await this.findOne(id);
    return this.SeriesRepository.delete(serie.id);
  }
}
