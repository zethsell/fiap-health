export const parseResponseErrorToHtml = (errors: string): string => {
    return `Errors:<br>
        <ul style="list-style-type: circle!important;">
          <p >  ${Object.values(errors).map(value => `- ${value}`).join('</br>')}</p>
        </ul>`
}