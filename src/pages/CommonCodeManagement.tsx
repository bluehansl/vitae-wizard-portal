import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useCommonCodes } from '@/hooks/useCommonCodes';
import { useToast } from '@/hooks/use-toast';
import { CommonCodeCategory, COMMON_CODE_CATEGORIES } from '@/types/commonCode';
import { ArrowLeft } from 'lucide-react';

const CommonCodeManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    addCommonCode, 
    updateCommonCode, 
    deleteCommonCode, 
    getAllCommonCodesByCategory 
  } = useCommonCodes();

  const [activeTab, setActiveTab] = useState<CommonCodeCategory>('degree');
  const [newValue, setNewValue] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const handleAddCode = () => {
    if (!newValue.trim()) {
      toast({
        title: "입력 오류",
        description: "값을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    const existingCodes = getAllCommonCodesByCategory(activeTab);
    const maxOrder = Math.max(...existingCodes.map(code => code.order), 0);

    addCommonCode({
      category: activeTab,
      value: newValue.trim(),
      order: maxOrder + 1,
      isActive: true
    });

    setNewValue('');
    toast({
      title: "추가 완료",
      description: "공통코드가 성공적으로 추가되었습니다."
    });
  };

  const handleEdit = (id: string, currentValue: string) => {
    setEditingId(id);
    setEditingValue(currentValue);
  };

  const handleSaveEdit = (code: any) => {
    if (!editingValue.trim()) {
      toast({
        title: "입력 오류", 
        description: "값을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }

    updateCommonCode({
      ...code,
      value: editingValue.trim()
    });

    setEditingId(null);
    setEditingValue('');
    toast({
      title: "수정 완료",
      description: "공통코드가 성공적으로 수정되었습니다."
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingValue('');
  };

  const handleToggleActive = (code: any) => {
    updateCommonCode({
      ...code,
      isActive: !code.isActive
    });

    toast({
      title: code.isActive ? "비활성화 완료" : "활성화 완료",
      description: `공통코드가 ${code.isActive ? '비활성화' : '활성화'}되었습니다.`
    });
  };

  const handleDelete = (id: string, value: string) => {
    if (confirm(`"${value}" 코드를 삭제하시겠습니까?`)) {
      deleteCommonCode(id);
      toast({
        title: "삭제 완료",
        description: "공통코드가 성공적으로 삭제되었습니다."
      });
    }
  };

  const renderCodeTable = (category: CommonCodeCategory) => {
    const codes = getAllCommonCodesByCategory(category);

    return (
      <div className="space-y-6">
        {/* 새 코드 추가 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">새 {COMMON_CODE_CATEGORIES[category]} 추가</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="newValue">값</Label>
                <Input
                  id="newValue"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder={`새 ${COMMON_CODE_CATEGORIES[category]} 입력`}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCode()}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddCode}>추가</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 코드 목록 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{COMMON_CODE_CATEGORIES[category]} 목록</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">순서</TableHead>
                  <TableHead>값</TableHead>
                  <TableHead className="w-24 text-center">활성화</TableHead>
                  <TableHead className="w-32 text-center">관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      등록된 코드가 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  codes.map((code) => (
                    <TableRow key={code.id}>
                      <TableCell className="text-center">{code.order}</TableCell>
                      <TableCell>
                        {editingId === code.id ? (
                          <Input
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEdit(code);
                              if (e.key === 'Escape') handleCancelEdit();
                            }}
                            autoFocus
                          />
                        ) : (
                          <span className={code.isActive ? '' : 'text-muted-foreground line-through'}>
                            {code.value}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={code.isActive}
                          onCheckedChange={() => handleToggleActive(code)}
                          disabled={editingId === code.id}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-center">
                          {editingId === code.id ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSaveEdit(code)}
                                className="h-8 px-3"
                              >
                                저장
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCancelEdit}
                                className="h-8 px-3"
                              >
                                취소
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(code.id, code.value)}
                                className="h-8 px-3"
                              >
                                수정
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(code.id, code.value)}
                                className="h-8 px-3"
                              >
                                삭제
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">공통코드 관리</h1>
          <p className="text-muted-foreground mt-2">시스템에서 사용하는 공통코드를 관리하세요</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as CommonCodeCategory)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="degree">학위</TabsTrigger>
          <TabsTrigger value="graduationStatus">졸업상태</TabsTrigger>
          <TabsTrigger value="position">직급</TabsTrigger>
        </TabsList>

        <TabsContent value="degree" className="mt-6">
          {renderCodeTable('degree')}
        </TabsContent>

        <TabsContent value="graduationStatus" className="mt-6">
          {renderCodeTable('graduationStatus')}
        </TabsContent>

        <TabsContent value="position" className="mt-6">
          {renderCodeTable('position')}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommonCodeManagement;