import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('Boards');
  constructor(private boardsService: BoardsService) { }

  @Get('/:id')
  async getBoardByid(@Param('id') id: number): Promise<Board> {
    return await this.boardsService.getBoardById(id);
  }

  @Get() 
  getAllBoards(
    @GetUser() user: User,
  ): Promise<Board[]> {
    this.logger.verbose(`User "${user.username}" Get all boards`);
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  creatBoard(
    @Body() creatBoardDto: CreateBoardDto,   
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(`User ${user.username} add new board Payload: ${JSON.stringify(creatBoardDto)}`);
    return this.boardsService.createBoard(creatBoardDto, user);
  }

  @Delete('/:id')
  async deleteBoard(@Param('id', ParseIntPipe) id: number,
  @GetUser() user: User
  ): Promise<void> {
    await this.boardsService.deleteBoard(id, user);
  }


  // @Get() 
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(
  //   @Body() createBoardDto : CreateBoardDto
  // ){
  //   return this.boardsService.createBoard(createBoardDto);
  // }

  // // @Param() params: string[] 
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }

  // //파라메터방식
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deteteBoard(id);
  // }

  // //폼방식
  // @Delete()
  // deleteBoardById(@Body('id') id: string): void {
  //   this.boardsService.deteteBoard(id);
  // }

  // @Patch('/:id')
  // updateBoardStatus(
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,        
  //     @Param('id') id: string,
      
  // ) {
  //     return this.boardsService.updateBoardStatus(id, status);
  // }

}
