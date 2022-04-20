import { NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

// npm i typeorm@0.2 --save 한동안 이럴게!
//
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const {title, description} = createBoardDto;
    const board = this.create({
      title,
      description,
      static: BoardStatus.public,
      user: user
    });
    this.save(board);
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne({ id: id });
    // v0.3 ~ this.findOne({where: {id: id}}) 

    if (!found) {
        throw new NotFoundException(`Can't find the board with id ${id}`);
    }
    return found;
  }

  async getAllBoards(): Promise<Board[]> {
    return await this.find();
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.delete({ id: id, user: user });
    if(result.affected === 0) {
      throw new NotFoundException(`Can't find the board with id ${id}`);
    }
  }


}