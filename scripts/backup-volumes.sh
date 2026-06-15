#!/bin/bash
DATE=$(date +%Y-%m-%d)
BACKUP_DIR=/opt/planopratico/backups/$DATE
LOG=/opt/planopratico/logs/backup-volumes.log

mkdir -p "$BACKUP_DIR"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] INÍCIO backup $DATE" >> $LOG

# Compactar volumes
if tar -czf "$BACKUP_DIR/volumes.tar.gz" -C /opt/planopratico volumes 2>> $LOG; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] volumes.tar.gz: $(du -sh $BACKUP_DIR/volumes.tar.gz | cut -f1)" >> $LOG
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERRO: falha ao compactar volumes" >> $LOG
    exit 1
fi

# Compactar stacks
if tar -czf "$BACKUP_DIR/stacks.tar.gz" -C /opt/planopratico stacks 2>> $LOG; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] stacks.tar.gz: $(du -sh $BACKUP_DIR/stacks.tar.gz | cut -f1)" >> $LOG
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERRO: falha ao compactar stacks" >> $LOG
    exit 1
fi

# Manter apenas os últimos 7 backups
ls -dt /opt/planopratico/backups/*/ 2>/dev/null | tail -n +8 | xargs rm -rf 2>/dev/null

echo "[$(date '+%Y-%m-%d %H:%M:%S')] FIM backup — OK" >> $LOG
