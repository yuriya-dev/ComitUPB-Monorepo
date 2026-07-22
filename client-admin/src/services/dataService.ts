import { supabase } from '@/lib/supabase';
import { 
  mockDivisions, 
  mockMembers, 
  mockEvents, 
  mockShowcases, 
  mockMessages, 
  mockVaultModules 
} from '@/lib/mockData';
import { 
  DivisionItem, 
  MemberItem, 
  EventItem, 
  ShowcaseItem, 
  ContactMessage, 
  VaultModuleItem 
} from '@/types/admin';

// --- DIVISIONS ---
export async function getDivisions(): Promise<DivisionItem[]> {
  try {
    const { data, error } = await supabase.from('divisions').select('*');
    if (error || !data || data.length === 0) return mockDivisions;
    return data as DivisionItem[];
  } catch {
    return mockDivisions;
  }
}

export async function addDivision(div: Omit<DivisionItem, 'id'>): Promise<DivisionItem | null> {
  const newDiv = { ...div, id: `div-${Date.now()}` };
  const { data, error } = await supabase.from('divisions').insert([newDiv]).select().single();
  if (error) {
    console.error('Error inserting division:', error);
    return newDiv;
  }
  return data as DivisionItem;
}

export async function updateDivision(id: string, div: Partial<DivisionItem>): Promise<boolean> {
  const { error } = await supabase.from('divisions').update(div).eq('id', id);
  return !error;
}

export async function deleteDivision(id: string): Promise<boolean> {
  const { error } = await supabase.from('divisions').delete().eq('id', id);
  return !error;
}

// --- MEMBERS ---
export async function getMembers(): Promise<MemberItem[]> {
  try {
    const { data, error } = await supabase.from('members').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return mockMembers;
    return data as MemberItem[];
  } catch {
    return mockMembers;
  }
}

export async function addMember(member: Omit<MemberItem, 'id'>): Promise<MemberItem | null> {
  const newMember = { ...member, id: `mem-${Date.now()}` };
  const { data, error } = await supabase.from('members').insert([newMember]).select().single();
  if (error) {
    console.error('Error inserting member:', error);
    return newMember;
  }
  return data as MemberItem;
}

export async function updateMember(id: string, member: Partial<MemberItem>): Promise<boolean> {
  const { error } = await supabase.from('members').update(member).eq('id', id);
  return !error;
}

export async function deleteMember(id: string): Promise<boolean> {
  const { error } = await supabase.from('members').delete().eq('id', id);
  return !error;
}

// --- EVENTS ---
export async function getEvents(): Promise<EventItem[]> {
  try {
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: false });
    if (error || !data || data.length === 0) return mockEvents;
    return data as EventItem[];
  } catch {
    return mockEvents;
  }
}

export async function addEvent(eventItem: Omit<EventItem, 'id'>): Promise<EventItem | null> {
  const newEvent = { ...eventItem, id: `evt-${Date.now()}` };
  const { data, error } = await supabase.from('events').insert([newEvent]).select().single();
  if (error) {
    console.error('Error inserting event:', error);
    return newEvent;
  }
  return data as EventItem;
}

export async function updateEvent(id: string, eventItem: Partial<EventItem>): Promise<boolean> {
  const { error } = await supabase.from('events').update(eventItem).eq('id', id);
  return !error;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const { error } = await supabase.from('events').delete().eq('id', id);
  return !error;
}

// --- SHOWCASES ---
export async function getShowcases(): Promise<ShowcaseItem[]> {
  try {
    const { data, error } = await supabase.from('showcases').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return mockShowcases;
    return data as ShowcaseItem[];
  } catch {
    return mockShowcases;
  }
}

export async function addShowcase(showcase: Omit<ShowcaseItem, 'id'>): Promise<ShowcaseItem | null> {
  const newShowcase = { ...showcase, id: `sc-${Date.now()}` };
  const { data, error } = await supabase.from('showcases').insert([newShowcase]).select().single();
  if (error) {
    console.error('Error inserting showcase:', error);
    return newShowcase;
  }
  return data as ShowcaseItem;
}

export async function updateShowcase(id: string, showcase: Partial<ShowcaseItem>): Promise<boolean> {
  const { error } = await supabase.from('showcases').update(showcase).eq('id', id);
  return !error;
}

export async function deleteShowcase(id: string): Promise<boolean> {
  const { error } = await supabase.from('showcases').delete().eq('id', id);
  return !error;
}

// --- MESSAGES ---
export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return mockMessages;
    return data as ContactMessage[];
  } catch {
    return mockMessages;
  }
}

export async function toggleMessageReadStatus(id: string, currentStatus: boolean): Promise<boolean> {
  const { error } = await supabase.from('contact_messages').update({ is_read: !currentStatus }).eq('id', id);
  return !error;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  return !error;
}

// --- VAULT MODULES ---
export async function getVaultModules(): Promise<VaultModuleItem[]> {
  try {
    const { data, error } = await supabase.from('vault_modules').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return mockVaultModules;
    return data as VaultModuleItem[];
  } catch {
    return mockVaultModules;
  }
}

export async function addVaultModule(moduleItem: Omit<VaultModuleItem, 'id'>): Promise<VaultModuleItem | null> {
  const newMod = { ...moduleItem, id: `mod-${Date.now()}` };
  const { data, error } = await supabase.from('vault_modules').insert([newMod]).select().single();
  if (error) {
    console.error('Error inserting vault module:', error);
    return newMod;
  }
  return data as VaultModuleItem;
}

export async function updateVaultModule(id: string, moduleItem: Partial<VaultModuleItem>): Promise<boolean> {
  const { error } = await supabase.from('vault_modules').update(moduleItem).eq('id', id);
  return !error;
}

export async function deleteVaultModule(id: string): Promise<boolean> {
  const { error } = await supabase.from('vault_modules').delete().eq('id', id);
  return !error;
}

// --- ORG CHART NODES & EDGES ---
export interface OrgChartNodeDB {
  id: string;
  name: string;
  role: string;
  division: string;
  avatar_url?: string;
  position_x: number;
  position_y: number;
}

export interface OrgChartEdgeDB {
  id: string;
  source: string;
  target: string;
}

export async function getOrgChartNodes(): Promise<OrgChartNodeDB[]> {
  try {
    const { data, error } = await supabase.from('org_chart_nodes').select('*');
    if (error || !data || data.length === 0) {
      const local = typeof window !== 'undefined' ? localStorage.getItem('comitupb_org_nodes') : null;
      if (local) return JSON.parse(local);
      return [];
    }
    return data.map((d: any) => ({
      id: d.id,
      name: d.name,
      role: d.role,
      division: d.division,
      avatar_url: d.avatar_url,
      position_x: Number(d.position_x),
      position_y: Number(d.position_y)
    }));
  } catch {
    const local = typeof window !== 'undefined' ? localStorage.getItem('comitupb_org_nodes') : null;
    if (local) return JSON.parse(local);
    return [];
  }
}

export async function saveOrgChartNodesLocallyOrRemote(nodes: OrgChartNodeDB[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('comitupb_org_nodes', JSON.stringify(nodes));
  }
  try {
    for (const n of nodes) {
      await supabase.from('org_chart_nodes').upsert({
        id: n.id,
        name: n.name,
        role: n.role,
        division: n.division,
        avatar_url: n.avatar_url,
        position_x: n.position_x,
        position_y: n.position_y
      });
    }
  } catch (err) {
    console.error('Remote node upsert error:', err);
  }
}

export async function deleteOrgChartNodeRemote(id: string) {
  try {
    await supabase.from('org_chart_nodes').delete().eq('id', id);
  } catch (err) {
    console.error('Remote node delete error:', err);
  }
}

export async function getOrgChartEdges(): Promise<OrgChartEdgeDB[]> {
  try {
    const { data, error } = await supabase.from('org_chart_edges').select('*');
    if (error || !data || data.length === 0) {
      const local = typeof window !== 'undefined' ? localStorage.getItem('comitupb_org_edges') : null;
      if (local) return JSON.parse(local);
      return [];
    }
    return data as OrgChartEdgeDB[];
  } catch {
    const local = typeof window !== 'undefined' ? localStorage.getItem('comitupb_org_edges') : null;
    if (local) return JSON.parse(local);
    return [];
  }
}

export async function saveOrgChartEdgesLocallyOrRemote(edges: OrgChartEdgeDB[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('comitupb_org_edges', JSON.stringify(edges));
  }
  try {
    for (const e of edges) {
      await supabase.from('org_chart_edges').upsert({
        id: e.id,
        source: e.source,
        target: e.target
      });
    }
  } catch (err) {
    console.error('Remote edge upsert error:', err);
  }
}

