const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>
        <p className="text-gray-600">¡Bienvenido a tu dashboard! Aquí podrás ver el resumen de tus actividades.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-3 text-gray-800">Estadísticas</h2>
          <p className="text-gray-600">Información general sobre tus estadísticas y actividades.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-3 text-gray-800">Actividades recientes</h2>
          <p className="text-gray-600">Lista de tus actividades más recientes.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-3 text-gray-800">Recordatorios</h2>
          <p className="text-gray-600">No tienes recordatorios pendientes.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;