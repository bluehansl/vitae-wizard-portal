import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useResumes } from '@/hooks/useResumes';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 10;

const ResumeList = () => {
  const navigate = useNavigate();
  const { resumes, deleteResume } = useResumes();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(resumes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResumes = resumes.slice(startIndex, endIndex);

  const handleDelete = (id: string, title: string) => {
    if (confirm(`"${title}" 이력서를 삭제하시겠습니까?`)) {
      deleteResume(id);
      toast({
        title: "삭제 완료",
        description: "이력서가 성공적으로 삭제되었습니다.",
      });
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/resume/edit/${id}`);
  };

  const handleView = (id: string) => {
    navigate(`/resume/view/${id}`);
  };

  const handleCreateNew = () => {
    navigate('/resume/create');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">이력서 목록</h1>
        <Button onClick={handleCreateNew}>
          신규 이력서 등록
        </Button>
      </div>

      {resumes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">등록된 이력서가 없습니다.</p>
            <Button onClick={handleCreateNew}>
              첫 번째 이력서 만들기
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4">
            {currentResumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <button
                      onClick={() => handleView(resume.id)}
                      className="text-left hover:text-primary transition-colors"
                    >
                      {resume.title}
                    </button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(resume.id)}
                      >
                        수정
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(resume.id, resume.title)}
                      >
                        삭제
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">이름:</span> {resume.basicInfo.name}
                    </div>
                    <div>
                      <span className="font-medium">전화번호:</span> {resume.basicInfo.phone}
                    </div>
                    <div>
                      <span className="font-medium">이메일:</span> {resume.basicInfo.email}
                    </div>
                    <div>
                      <span className="font-medium">수정일:</span> {new Date(resume.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={page === currentPage}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResumeList;