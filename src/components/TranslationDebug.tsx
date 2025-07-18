import { useTranslation } from 'react-i18next';
export const TranslationDebug = () => {
  const { t, i18n } = useTranslation('common');

  

  


  

  
  
  
  
  
  return (
    <div style={{ display: 'none' }}>
      <div>Root level: {t('my_students')}</div>
      <div>Nested level: {t('mentor.homeworks.title')}</div>
      <div>
        Current resources: {JSON.stringify(i18n.store.data[i18n.language].common, null, 2)}
      </div>
    </div>
  );
}; 
