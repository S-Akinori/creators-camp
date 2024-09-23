import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '../../atoms/Button';

const SNSLoginButtons: React.FC = () => {
  return (
    <div className="border-main border-2 p-4 mt-8 bg-main-cont">
        <p className="text-center text-main font-bold mb-4">SNSログイン</p>
        <div className='flex justify-center'>
            <Button className="mx-4" href={process.env.NEXT_PUBLIC_WEB_URL + '/login/github'}><GitHubIcon /></Button>
            <Button className="mx-4" href={process.env.NEXT_PUBLIC_WEB_URL + '/login/google'}><GoogleIcon /></Button>
        </div>
    </div>
  );
}

export default SNSLoginButtons;