import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  // private boards: Board[] = [];
  
  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // createBoard({title, description} : CreateBoardDto) {
  //   const board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.public
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((row) => row.id === id );
  //   if(!found) {
  //     throw new NotFoundException(`Can't found Board with id ${id}`);
  //   }
  //   return found;
  // }

  // deteteBoard(id: string): void {
  //   const found = this.getBoardById(id);
  //   this.boards = this.boards.filter((row) => row.id !== found.id);
  // }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

  //https://typeorm.io/repository-api 참조

  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ){}

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {    
    return await this.boardRepository.getBoardById(id);
  }

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.getAllBoards();
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    await this.boardRepository.deleteBoard(id, user);
  }

}
