import InsightEditor from '@/components/admin/insights/InsightEditor';

/** Yoca Admin — İçerik düzenleyici (id = 'new' yeni içerik). */
export default function AdminInsightEditorPage({ params }: { params: { id: string } }) {
  return <InsightEditor id={params.id} />;
}
