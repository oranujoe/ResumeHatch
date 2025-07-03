
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Award, Calendar, ExternalLink } from 'lucide-react';
import { Certification } from '@/hooks/useProfile';
import { format } from 'date-fns';

interface CertificationsSectionProps {
  certifications: Certification[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Certifications</h3>
          <p className="text-sm text-muted-foreground">
            {certifications.length} certification{certifications.length !== 1 ? 's' : ''} on record
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </div>

      {certifications.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No certifications added yet. Click "Add Certification" to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <Card key={cert.id || index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                    <p className="text-muted-foreground font-medium">{cert.issuing_organization}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Issued: {formatDate(cert.issue_date)}
                      </div>
                      {cert.expiry_date && (
                        <div className="flex items-center gap-2">
                          <span>Expires: {formatDate(cert.expiry_date)}</span>
                          <Badge variant={isExpired(cert.expiry_date) ? 'destructive' : 'secondary'} className="text-xs">
                            {isExpired(cert.expiry_date) ? 'Expired' : 'Active'}
                          </Badge>
                        </div>
                      )}
                      {!cert.expiry_date && cert.is_active && (
                        <Badge variant="secondary" className="text-xs">
                          No Expiry
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm">
                  {cert.credential_id && (
                    <div>
                      <span className="font-medium">Credential ID:</span> {cert.credential_id}
                    </div>
                  )}
                  {cert.verification_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={cert.verification_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Verify
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationsSection;
