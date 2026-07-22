'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { Plus, User, Shield, Image as ImageIcon, Upload, RotateCcw, Edit2, Trash2 } from 'lucide-react';
import Modal from '@/components/Modal';
import { 
  getOrgChartNodes, 
  getOrgChartEdges, 
  saveOrgChartNodesLocallyOrRemote, 
  saveOrgChartEdgesLocallyOrRemote,
  deleteOrgChartNodeRemote
} from '@/services/dataService';

// Custom Org Node Component with Edit/Delete controls on hover
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
      {/* Action Floating Badge on Hover (Edit & Delete) */}
      <div className="absolute -top-3 right-3 hidden group-hover:flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-full shadow-md z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (data.onEditNode) data.onEditNode(id, data);
          }}
          className="p-1 rounded-full hover:bg-light-blue text-slate-600 hover:text-primary transition-colors"
          title="Edit Anggota / Pengurus"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (data.onDeleteNode) data.onDeleteNode(id);
          }}
          className="p-1 rounded-full hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
          title="Hapus dari Bagan"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

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

// Hierarchical default fallback initial nodes
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

  // Modal State for Add & Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [role, setRole] = useState('Anggota Divisi');
  const [division, setDivision] = useState('Divisi Web Development');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Load persistence from DB / LocalStorage on mount
  useEffect(() => {
    async function loadOrgData() {
      const dbNodes = await getOrgChartNodes();
      const dbEdges = await getOrgChartEdges();

      if (dbNodes && dbNodes.length > 0) {
        setNodes(dbNodes.map(n => ({
          id: n.id,
          type: 'orgNode',
          data: { name: n.name, role: n.role, division: n.division, avatarUrl: n.avatar_url },
          position: { x: n.position_x, y: n.position_y }
        })));
      }

      if (dbEdges && dbEdges.length > 0) {
        setEdges(dbEdges.map(e => ({
          id: e.id,
          source: e.source,
          target: e.target,
          type: 'smoothstep',
          style: { stroke: '#0668C6', strokeWidth: 2.5 }
        })));
      }
    }
    loadOrgData();
  }, []);

  // Save updates to persistence
  const syncPersistence = useCallback((currentNodes: Node[], currentEdges: Edge[]) => {
    const nodePayload = currentNodes.map(n => ({
      id: n.id,
      name: n.data.name,
      role: n.data.role,
      division: n.data.division,
      avatar_url: n.data.avatarUrl,
      position_x: n.position.x,
      position_y: n.position.y
    }));
    saveOrgChartNodesLocallyOrRemote(nodePayload);

    const edgePayload = currentEdges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target
    }));
    saveOrgChartEdgesLocallyOrRemote(edgePayload);
  }, []);

  const handleAvatarChange = useCallback((nodeId: string, newAvatarUrl: string) => {
    setNodes((nds) => {
      const updated = nds.map((node) => {
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
      });
      syncPersistence(updated, edges);
      return updated;
    });
  }, [edges, syncPersistence]);

  const openAddModal = () => {
    setEditingNodeId(null);
    setName('');
    setRole('Anggota Divisi');
    setDivision('Divisi Web Development');
    setAvatarUrl('');
    setIsModalOpen(true);
  };

  const handleEditNode = useCallback((nodeId: string, nodeData: any) => {
    setEditingNodeId(nodeId);
    setName(nodeData.name || '');
    setRole(nodeData.role || 'Anggota Divisi');
    setDivision(nodeData.division || 'Divisi Web Development');
    setAvatarUrl(nodeData.avatarUrl || '');
    setIsModalOpen(true);
  }, []);

  const handleDeleteNode = useCallback((nodeId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pengurus/anggota ini dari bagan?')) {
      deleteOrgChartNodeRemote(nodeId);
      const updatedNodes = nodes.filter((node) => node.id !== nodeId);
      const updatedEdges = edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId);
      setNodes(updatedNodes);
      setEdges(updatedEdges);
      syncPersistence(updatedNodes, updatedEdges);
    }
  }, [nodes, edges, syncPersistence]);

  const nodesWithHandler = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onAvatarChange: handleAvatarChange,
        onEditNode: handleEditNode,
        onDeleteNode: handleDeleteNode,
      },
    }));
  }, [nodes, handleAvatarChange, handleEditNode, handleDeleteNode]);

  const nodeTypes = useMemo(() => ({ orgNode: OrgNode }), []);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => {
        const updated = applyNodeChanges(changes, nds);
        syncPersistence(updated, edges);
        return updated;
      });
    },
    [edges, syncPersistence]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => {
        const updated = applyEdgeChanges(changes, eds);
        syncPersistence(nodes, updated);
        return updated;
      });
    },
    [nodes, syncPersistence]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) => {
        const updated = addEdge({ ...connection, type: 'smoothstep', style: { stroke: '#0668C6', strokeWidth: 2.5 } }, eds);
        syncPersistence(nodes, updated);
        return updated;
      });
    },
    [nodes, syncPersistence]
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

  const handleSaveNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let updatedNodes = [...nodes];
    if (editingNodeId) {
      updatedNodes = nodes.map((node) => {
        if (node.id === editingNodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              name,
              role,
              division,
              avatarUrl,
            },
          };
        }
        return node;
      });
    } else {
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
      updatedNodes.push(newNode);
    }

    setNodes(updatedNodes);
    syncPersistence(updatedNodes, edges);
    setIsModalOpen(false);
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan susunan bagan ke posisi semula?')) {
      setNodes(initialNodes);
      setEdges(initialEdges);
      syncPersistence(initialNodes, initialEdges);
    }
  };

  return (
    <div className="space-y-4">
      {/* Clean Control Bar */}
      <div className="card-sculpted p-4 flex items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-medium">
          Arahkan kursor ke node untuk <span className="font-bold text-dark">Edit/Hapus</span>, atau tarik titik lingkar biru untuk menghubungkan hierarki.
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openAddModal} className="btn-primary-tactile">
            <Plus className="w-4 h-4" /> Tambah ke Bagan
          </button>
          <button onClick={handleReset} className="btn-secondary-sculpted !py-2" title="Reset Garis & Posisi">
            <RotateCcw className="w-4 h-4 text-primary" /> Reset
          </button>
        </div>
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

      {/* Modal Add / Edit Node */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingNodeId ? 'Edit Anggota / Pengurus Bagan' : 'Tambah Pengurus ke Bagan'}
        icon={<User className="w-5 h-5 text-primary" />}
      >
        <form onSubmit={handleSaveNode} className="space-y-4 text-xs font-medium">
          <div className="flex items-center gap-4">
            <label className="w-16 h-16 rounded-[14px] bg-slate-100 border-[1.5px] border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-primary overflow-hidden shrink-0">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-6 h-6 text-slate-400" />
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageFileSelect} />
            </label>
            <div className="flex-1">
              <label className="block text-slate-600 font-bold mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                required
                placeholder="Contoh: Rian Hidayat"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-[12px] px-3.5 py-2.5 text-dark focus:outline-none focus:border-primary font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
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

            <div>
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
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 rounded-[12px] bg-slate-100 text-slate-600 font-bold hover:bg-slate-200"
            >
              Batal
            </button>
            <button type="submit" className="btn-primary-tactile">
              {editingNodeId ? 'Simpan Perubahan' : 'Tambah ke Bagan'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
