import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">이력서 관리</h1>
          <p className="text-muted-foreground mt-2">등록된 이력서를 관리하고 새로운 이력서를 작성하세요</p>
        </div>
        <Button onClick={handleCreateNew} size="lg" className="px-8">
          + 새 이력서 작성
        </Button>
      </div>

      {resumes.length === 0 ? (
        <Card className="border-dashed border-2 border-muted-foreground/20">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">등록된 이력서가 없습니다</h3>
                <p className="text-muted-foreground">새로운 이력서를 작성하여 시작해보세요</p>
              </div>
              <Button onClick={handleCreateNew} size="lg" className="mt-4">
                첫 번째 이력서 만들기
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">이력서 목록</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="w-20 text-center">번호</TableHead>
                    <TableHead>이력서 제목</TableHead>
                    <TableHead className="w-32">작성자</TableHead>
                    <TableHead className="w-32">최종 수정일</TableHead>
                    <TableHead className="w-32 text-center">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentResumes.map((resume, index) => (
                    <TableRow key={resume.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="text-center font-medium">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleView(resume.id)}
                          className="text-left hover:text-primary transition-colors font-medium"
                        >
                          {resume.title || '제목 없음'}
                        </button>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {resume.basicInfo.name || '-'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(resume.updatedAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(resume.id)}
                            className="h-8 px-3"
                          >
                            수정
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(resume.id, resume.title)}
                            className="h-8 px-3"
                          >
                            삭제
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
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