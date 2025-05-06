import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDto, updateDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  boardGame(@Body() boardDto: BoardDto) {
    return this.boardService.boardGame(boardDto);
  }

  @Post('/winer')
  winer(@Body() data: updateDto) {
    return this.boardService.playerWiner(data);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   const board = this.boardService.findBoard(id);
  //   return board;
  // }

  @Get('ranking')
  async getRanking() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const getRanking = await this.boardService.getRanking();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return getRanking;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
