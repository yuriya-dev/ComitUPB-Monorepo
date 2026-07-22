'use client';

import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Handle,
  Position,
  BackgroundVariant
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Plus, User, Shield, Image as ImageIcon, Upload, RotateCcw } from 'lucide-react';

// Custom Org Node Component with Avatar Upload support
const OrgNode = ({ data, id }: { data: any; id: string }) => {
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (data.onAvatarChange) {
          data.onAvatarChange(id, reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="card-sculpted p-4 min-w-[240px] shadow-hack border-[1.5px] border-slate-200/90 relative bg-white group">
      {/* Top Handle for Connection */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!bg-primary !w-3.5 !h-3.5 !border-2 !border-white shadow-sm !-top-2" 
      />
      
      <div className="flex items-center gap-3.5">
        {/* Avatar Container with Upload trigger */}
        <div className="relative group/avatar">
          {data.avatarUrl ? (
            <img 
              src={data.avatarUrl} 
              alt={data.name} 
              className="w-12 h-12 rounded-[14px] object-cover border-[1.5px] border-primary/30 shadow-sm"
            />
          ) : (
            <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center font-bold text-white shadow-sm ${
              data.role === 'Ketua Umum' || data.role === 'Pembina' ? 'bg-primary shadow-[0_3px_0_0_#044484]' : 
              data.role.includes('Ketua Divisi') ? 'bg-indigo-600' : 'bg-slate-700'
            }`}>
              {data.role === 'Pembina' ? <Shield className="w-6 h-6" /> : <User className="w-6 h-6" />}
            </div>
          )}

          {/* Hover Overlay for Uploading Photo */}
          <label className="absolute inset-0 bg-dark/70 rounded-[14px] flex items-center justify-center text-white opacity-0 group-hover/avatar:opacity-100 cursor-pointer transition-all duration-200">
            <Upload className="w-4 h-4" />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAvatarUpload} 
            />
          </label>
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-[4px_10px_10px_4px] bg-light-blue text-primary border border-primary/30 uppercase tracking-wider block w-fit mb-0.5">
            {data.role}
          </span>
          <h4 className="font-extrabold text-dark text-sm truncate">{data.name}</h4>
          <p className="text-[11px] text-slate-500 font-medium truncate">{data.division}</p>
        </div>
      </div>

      {/* Bottom Handle for Connection */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!bg-primary !w-3.5 !h-3.5 !border-2 !border-white shadow-sm !-bottom-2" 
      />
    </div>
  );
};

// Neat hierarchical grid placement
const initialNodes: Node[] = [
  {
    id: 'node-pembina',
    type: 'orgNode',
    data: { name: 'Dr. H. Sukarni, M.Kom', role: 'Pembina Organisasi', division: 'Universitas Putra Bangsa', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
    position: { x: 380, y: 20 },
  },
  {
    id: 'node-ketua',
    type: 'orgNode',
    data: { name: 'Ahmad Rizky Pratama', role: 'Ketua Umum', division: 'BPH ComitUPB', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
    position: { x: 380, y: 170 },
  },
  {
    id: 'node-wakil',
    type: 'orgNode',
    data: { name: 'Siti Nurhaliza', role: 'Wakil Ketua', division: 'BPH ComitUPB', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
    position: { x: 380, y: 320 },
  },
  {
    id: 'node-div-web',
    type: 'orgNode',
    data: { name: 'Dimas Ardiansyah', role: 'Ketua Divisi', division: 'Divisi Web Development' },
    position: { x: 40, y: 470 },
  },
  {
    id: 'node-div-cyber',
    type: 'orgNode',
    data: { name: 'Budi Santoso', role: 'Ketua Divisi', division: 'Divisi Cyber Security' },
    position: { x: 380, y: 470 },
  },
  {
    id: 'node-div-mobile',
    type: 'orgNode',
    data: { name: 'Nadia Putri', role: 'Ketua Divisi', division: 'Divisi Mobile App' },
    position: { x: 720, y: 470 },
  },
];

// Clean edge connections with primary blue stroke
const initialEdges: Edge[] = [
  { id: 'e-pembina-ketua', source: 'node-pembina', target: 'node-ketua', type: 'smoothstep', style: { stroke: '#0668C6', strokeWidth: 2.5 } },
  { id: 'e-ketua-wakil', source: 'node-ketua', target: 'node-wakil', type: 'smoothstep', style: { stroke: '#0668C6', strokeWidth: 2.5 } },
  { id: 'e-wakil-web', source: 'node-wakil', target: 'node-div-web', type: 'smoothstep', style: { stroke: '#0668C6', strokeWidth: 2 } },
  { id: 'e-wakil-cyber', source: 'node-wakil', target: 'node-div-cyber', type: 'smoothstep', style: { stroke: '#0668C6', strokeWidth: 2 } },
  { id: 'e-wakil-mobile', source: 'node-wakil', target: 'node-div-mobile', type: 'smoothstep', style: { stroke: '#0668C6', strokeWidth: 2 } },
];

export default function OrgChartCanvas() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // Form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('Anggota Divisi');
  const [division, setDivision] = useState('Divisi Web Development');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Handle avatar update for specific node
  const handleAvatarChange = useCallback((nodeId: string, newAvatarUrl: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              avatarUrl: newAvatarUrl,
            },
          };
        }
        return node;
      })
    );
  }, []);

  // Pass handler to nodes
  const nodesWithHandler = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onAvatarChange: handleAvatarChange,
      },
    }));
  }, [nodes, handleAvatarChange]);

  const nodeTypes = useMemo(() => ({ orgNode: OrgNode }), []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection, type: 'smoothstep', style: { stroke: '#0668C6', strokeWidth: 2.5 } }, eds)),
    []
  );

  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newNodeId = `node-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      type: 'orgNode',
      data: { name, role, division, avatarUrl },
      position: { 
        x: 100 + (nodes.length % 3) * 310, 
        y: 470 + Math.floor(nodes.length / 3) * 150 
      },
    };

    setNodes((nds) => nds.concat(newNode));
    setName('');
    setAvatarUrl('');
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan posisi dan garis penghubung ke susunan rapi semula?')) {
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Node Form Panel with Reset Button inline */}
      <div className="card-sculpted p-5">
        <form onSubmit={handleAddNode} className="flex flex-wrap items-end gap-4 text-xs font-medium">
          {/* Avatar Upload Preview */}
          <div className="flex flex-col items-center justify-center">
            <label className="text-slate-600 font-bold mb-1 block">Foto</label>
            <label className="w-11 h-11 rounded-[12px] bg-slate-100 border-[1.5px] border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-primary hover:bg-light-blue transition-all overflow-hidden">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-5 h-5 text-slate-400" />
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageFileSelect} />
            </label>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-slate-600 font-bold mb-1">Nama Pengurus / Anggota</label>
            <input 
              type="text" 
              required
              placeholder="Contoh: Rian Hidayat"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark focus:outline-none focus:border-primary font-semibold"
            />
          </div>

          <div className="w-48">
            <label className="block text-slate-600 font-bold mb-1">Jabatan / Role</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark focus:outline-none focus:border-primary font-semibold"
            >
              <option value="Pembina Organisasi">Pembina Organisasi</option>
              <option value="Ketua Umum">Ketua Umum</option>
              <option value="Wakil Ketua">Wakil Ketua</option>
              <option value="Sekretaris">Sekretaris</option>
              <option value="Bendahara">Bendahara</option>
              <option value="Ketua Divisi">Ketua Divisi</option>
              <option value="Anggota Divisi">Anggota Divisi</option>
            </select>
          </div>

          <div className="w-56">
            <label className="block text-slate-600 font-bold mb-1">Divisi / Unit</label>
            <select 
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark focus:outline-none focus:border-primary font-semibold"
            >
              <option value="BPH ComitUPB">BPH ComitUPB</option>
              <option value="Divisi Web Development">Divisi Web Development</option>
              <option value="Divisi Cyber Security">Divisi Cyber Security</option>
              <option value="Divisi Mobile App">Divisi Mobile App</option>
              <option value="Divisi Data & AI">Divisi Data & AI</option>
              <option value="Divisi Creative UI/UX">Divisi Creative UI/UX</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button type="submit" className="btn-primary-tactile">
              <Plus className="w-4 h-4" /> Tambah
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary-sculpted !py-2.5" title="Reset Garis & Posisi">
              <RotateCcw className="w-4 h-4 text-primary" /> Reset
            </button>
          </div>
        </form>
      </div>

      {/* Interactive Canvas */}
      <div className="card-sculpted h-[712px] w-full overflow-hidden relative border-[1.5px] border-slate-200/90 shadow-hack">
        <ReactFlow
          nodes={nodesWithHandler}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-slate-50/60"
        >
          <Controls className="!bg-white !border-[1.5px] !border-slate-200 !rounded-[12px] !shadow-sm" />
          <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#CBD5E1" />
        </ReactFlow>
      </div>
    </div>
  );
}
