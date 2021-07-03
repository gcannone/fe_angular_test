import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommitsApiService } from 'src/app/api/commits/commits-api.service';
import { Commits } from 'src/app/api/commits/commits-dto';
import { PaginatorConfig } from 'src/app/shared/components/paginator/paginator.component';
import { ColumnConfig } from 'src/app/shared/components/table/table.interfaces';

@Component({
  selector: 'app-commits-page',
  templateUrl: './commits-page.component.html',
  styleUrls: ['./commits-page.component.scss']
})
export class CommitsPageComponent implements OnInit, OnDestroy {

  repo = '';

  dataSource!: MatTableDataSource<Commits>;

  columns: ColumnConfig[] = [
    {
      name: 'author',
      label: 'Author',
      type: 'string'
    },
    {
      name: 'url',
      label: 'URL',
      type: 'string'
    },
    {
      name: 'commitMessage',
      label: 'Commit Message',
      type: 'string'
    }
  ];

  isLoading = false;

  paginatorConfig!: PaginatorConfig;

  private _subs = new Subscription();

  private readonly itemPerPage = 25;

  constructor(private router: Router, private commitsApiService: CommitsApiService) { }

  ngOnInit() {
    if (window.history?.state?.repo) {
      this.repo = window.history?.state?.repo;
      this.loadCommits();
    } else {
      this.router.navigate(['repos']);
    }
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  changePage(page: 'next' | 'prev') {
    this.loadCommits(page === 'next' ? this.paginatorConfig.currentPage + 1 : this.paginatorConfig.currentPage - 1);
  }

  loadCommits(page = 1) {
    this.isLoading = true;
    this._subs.add(
      this.commitsApiService.getCommits(this.repo, page, this.itemPerPage)
        .subscribe(res => {
          if (res) {
            if (!this.dataSource) {
              this.dataSource = new MatTableDataSource<Commits>(res.items);
            } else {
              this.dataSource.data = res.items;
            }
            this.isLoading = false;
            this.paginatorConfig = {
              totalItems: res.total_count,
              currentPage: page,
              totalPages: Math.ceil(res.total_count / this.itemPerPage)
            };
          }
        })
    );
  }

}
