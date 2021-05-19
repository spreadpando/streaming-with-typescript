import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  return await new Promise(resolve => {
    const { name, email, comment } = JSON.parse(req.body)
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'chad.paley.henderson@gmail.com',
      from: 'no-reply@chaderson.com',
      replyTo: `${email}`,
      subject: `${name} via chaderson.com`,
      text: `comment: ${comment}`
    }
    sgMail.send(msg).then(() => {
      res.status(200).send('success')
      return resolve()
    }).catch(err => {
      console.log(err)
      if (err.response != null) {
      // Extract error msg
        const { message, code, response } = err

        // Extract response msg
        const { headers, body } = response

        console.error(body)
        console.error(message, code, headers)
        res.status(500).send('failure')
        return resolve()
      }
    })
  })
}
