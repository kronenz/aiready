import type { VersionUpdate } from '../types';

export const versionUpdates: VersionUpdate[] = [
  { id: 'v1', name: 'Spark', icon: '✨', currentVersion: '3.5.3', latestVersion: '3.6.0', compatible: true, note: 'Iceberg 1.6+ 필요', date: '2026-02-20' },
  { id: 'v2', name: 'Trino', icon: '🔎', currentVersion: '453', latestVersion: '460', compatible: true, note: 'K8s 1.30+ 필요', date: '2026-02-18' },
  { id: 'v3', name: 'Cilium', icon: '🔒', currentVersion: '1.16.1', latestVersion: '1.16.4', compatible: true, patchOnly: true, note: '보안 패치', date: '2026-02-22' },
  { id: 'v4', name: 'OpenSearch', icon: '🔍', currentVersion: '2.16.0', latestVersion: '2.18.0', compatible: false, note: 'Fluent Bit 3.2+ 먼저 필요', date: '2026-02-15' },
  { id: 'v5', name: 'Iceberg', icon: '🧊', currentVersion: '1.6.1', latestVersion: '1.7.0', compatible: true, note: 'Spark 3.5.3 호환', date: '2026-02-24' },
];

export const compatibilityMatrix = {
  headers: {
    rows: ['Spark 3.5.3', 'Spark 3.6.0', 'Trino 453', 'Trino 460', 'Airflow 2.10'],
    cols: ['K8s 1.29', 'K8s 1.30', 'K8s 1.31', 'Iceberg 1.5', 'Iceberg 1.6', 'Iceberg 1.7'],
  },
  data: [
    ['✅', '✅', '✅', '✅', '✅', '⚠️'],
    ['❌', '✅', '✅', '❌', '✅', '✅'],
    ['✅', '✅', '✅', '✅', '✅', '✅'],
    ['❌', '✅', '✅', '✅', '✅', '✅'],
    ['✅', '✅', '✅', '—', '—', '—'],
  ] as string[][],
};

export const upgradeSteps = [
  { step: 1, title: 'Upgrade Iceberg', detail: '1.5.2 → 1.6.1' },
  { step: 2, title: 'Migrate HMS schema', detail: 'v3 → v4' },
  { step: 3, title: 'Rebuild Spark Image', detail: 'Custom build' },
  { step: 4, title: 'Upgrade Spark', detail: '3.5.3 → 3.6.0' },
  { step: 5, title: 'Verify Trino Catalog', detail: 'Integration test' },
];
