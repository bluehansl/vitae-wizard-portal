import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 
            className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            이력서 관리 시스템
          </h1>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/common-codes')}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            공통코드 관리
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;