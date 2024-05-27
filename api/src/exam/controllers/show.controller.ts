import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ParamValidationPipe } from '../../common/pipes'
import { ClientProxyRMQ } from '../../proxy'
import { catchError } from 'rxjs'

@Controller('api/exams')
export class ExamShowController {
  constructor(private readonly clientProxy: ClientProxyRMQ) {}

  @Get('/:id')
  async handle(@Param('id', ParamValidationPipe) id: string) {
    try {
      const instance = this.clientProxy.getInstance('exams')
      return instance.send('exam-show', id).pipe(
        catchError((error) => {
          throw error
        }),
      )
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
