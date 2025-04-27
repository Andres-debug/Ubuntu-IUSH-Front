import { useState, useEffect } from 'react';
import { HiOutlineDocumentText, HiOutlineClipboardCheck, HiOutlineClock } from 'react-icons/hi';
import { IoCloudUploadOutline } from 'react-icons/io5';

// Componente para la subida de archivos
const FileUpload = ({ title, description, icon, accept }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  accept: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      // Aquí iría la lógica para subir el archivo al servidor
      console.log(`Subiendo archivo: ${file.name}`);
      
      // Simulamos una subida exitosa
      setTimeout(() => {
        alert(`Archivo ${file.name} subido con éxito.`);
        setFile(null);
      }, 1500);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-blue-500 text-xl">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      
      <p className="text-gray-600 mb-5">{description}</p>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
          isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="w-full">
            <div className="flex items-center space-x-3 mb-3">
              <HiOutlineDocumentText className="text-blue-500 text-xl" />
              <span className="text-gray-700 font-medium truncate">{file.name}</span>
              <span className="text-sm text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button 
                onClick={() => setFile(null)}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleUpload}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 flex items-center justify-center"
              >
                <IoCloudUploadOutline className="mr-2" /> Subir archivo
              </button>
            </div>
          </div>
        ) : (
          <>
            <IoCloudUploadOutline className="text-gray-400 text-4xl mb-3" />
            <p className="text-gray-500 text-center mb-3">Arrastra y suelta tu archivo aquí o</p>
            <label className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer">
              Seleccionar archivo
              <input 
                type="file" 
                accept={accept}
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
            <p className="text-gray-400 text-sm mt-3">Formato aceptado: {accept}</p>
          </>
        )}
      </div>
    </div>
  );
};

const CargaAcademicaPage = () => {
  useEffect(() => {
    document.title = 'Carga Académica | OmegaLab';
  }, []);

  // Datos de ejemplo para el selector de materias
  const materias = [
    { id: 1, codigo: 'MAT-101', nombre: 'Cálculo Diferencial' },
    { id: 2, codigo: 'FIS-201', nombre: 'Física Mecánica' },
    { id: 3, codigo: 'PROG-301', nombre: 'Programación Orientada a Objetos' },
    { id: 4, codigo: 'BD-401', nombre: 'Bases de Datos' },
    { id: 5, codigo: 'ING-501', nombre: 'Inglés Técnico' }
  ];

  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('2025-1');

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Carga Académica</h1>
        <p className="text-gray-600">Sube información académica que será usada para analizar la detección temprana de estrés académico en estudiantes.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label htmlFor="materia" className="block text-sm font-medium text-gray-700 mb-1">
              Materia
            </label>
            <select
              id="materia"
              value={materiaSeleccionada}
              onChange={(e) => setMateriaSeleccionada(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Selecciona una materia</option>
              {materias.map(materia => (
                <option key={materia.id} value={materia.id}>
                  {materia.codigo} - {materia.nombre}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="periodo" className="block text-sm font-medium text-gray-700 mb-1">
              Periodo Académico
            </label>
            <select
              id="periodo"
              value={periodoSeleccionado}
              onChange={(e) => setPeriodoSeleccionado(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="2025-1">2025-1</option>
              <option value="2024-2">2024-2</option>
              <option value="2024-1">2024-1</option>
              <option value="2023-2">2023-2</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FileUpload 
          title="Calificaciones" 
          description="Sube el archivo con las notas de los estudiantes para esta materia. Incluye evaluaciones parciales y finales."
          icon={<HiOutlineDocumentText />}
          accept=".xlsx, .csv"
        />
        
        <FileUpload 
          title="Asistencias" 
          description="Sube el registro de asistencia a clases de los estudiantes para detectar patrones de inasistencia."
          icon={<HiOutlineClipboardCheck />}
          accept=".xlsx, .csv"
        />
        
        <FileUpload 
          title="Carga Horaria" 
          description="Sube el archivo con la distribución de horas académicas y trabajos asignados por semana."
          icon={<HiOutlineClock />}
          accept=".xlsx, .csv"
        />
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-medium text-blue-800 mb-2">Información sobre el análisis de estrés académico</h3>
        <p className="text-blue-700 mb-4">
          Los archivos subidos serán procesados por nuestro sistema de detección temprana de estrés académico, 
          el cual analiza patrones en el rendimiento, asistencia y carga de trabajo para identificar estudiantes en riesgo.
        </p>
        <ul className="list-disc list-inside text-blue-700 space-y-1">
          <li>Los datos se tratan de forma confidencial y solo para fines académicos</li>
          <li>Los resultados del análisis estarán disponibles en el módulo de "Reportes"</li>
          <li>La detección temprana permite intervenir antes de que el rendimiento se vea afectado</li>
          <li>Asegúrate de subir archivos actualizados para un análisis preciso</li>
        </ul>
      </div>
    </div>
  );
};

export default CargaAcademicaPage;